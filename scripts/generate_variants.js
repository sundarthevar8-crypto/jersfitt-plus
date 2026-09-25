const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, '../public/images/jersey');
const outputDir = inputDir;

async function processImage(inputFilename, variantName, transformFn) {
  const inputPath = path.join(inputDir, inputFilename);
  const outputPath = path.join(outputDir, `${variantName}-${inputFilename.replace('black-blue-', '')}`);

  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const outData = Buffer.from(data);

  for (let i = 0; i < outData.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const [newR, newG, newB] = transformFn(r, g, b);
    outData[i] = newR;
    outData[i + 1] = newG;
    outData[i + 2] = newB;
  }

  await sharp(outData, { raw: { width, height, channels } })
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log(`Generated: ${outputPath}`);
}

// 1. Red / Black variant:
// Black body becomes Deep Crimson / Scarlet Red.
// Blue accent becomes Charcoal Black.
// Towel (light grey / white) remains unchanged.
function transformRedBlack(r, g, b) {
  // Background is pure white/light grey (r > 240 && g > 240 && b > 240)
  if (r > 235 && g > 235 && b > 235) {
    return [r, g, b];
  }

  // Microfiber Towel area: Light grey / textured (r: 140-220, g: 140-220, b: 140-220, low saturation)
  const isGreyTowel = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && r > 115 && r < 235;
  if (isGreyTowel) {
    return [r, g, b];
  }

  // Logo JERSFITT (White letters): r > 210, g > 210, b > 210
  if (r > 210 && g > 210 && b > 210) {
    return [r, g, b];
  }

  // Blue accent: b > r + 30 && b > g
  const isBlue = b > r + 35 && b > g && b > 80;
  if (isBlue) {
    // Turn blue accent into Black/Charcoal trim
    const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    const darkVal = Math.min(45, Math.round(lum * 0.3));
    return [darkVal, darkVal, darkVal + 5];
  }

  // Main Black body: Dark colors (r < 75 && g < 75 && b < 75)
  // Shift to rich dynamic red
  const lum = (r + g + b) / 3;
  const redFactor = Math.min(255, Math.round(lum * 2.8 + 110));
  const otherFactor = Math.round(lum * 0.35);
  return [redFactor, otherFactor, otherFactor];
}

// 2. Blue / Red variant:
// Main Black body becomes Royal Electric Blue.
// Accent becomes Vibrant Red trim.
// Towel remains light grey.
function transformBlueRed(r, g, b) {
  if (r > 235 && g > 235 && b > 235) return [r, g, b];

  const isGreyTowel = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && r > 115 && r < 235;
  if (isGreyTowel) return [r, g, b];

  if (r > 210 && g > 210 && b > 210) return [r, g, b];

  const isBlue = b > r + 35 && b > g && b > 80;
  if (isBlue) {
    // Accent becomes Red
    return [220, 30, 40];
  }

  // Main body becomes Athletic Blue
  const lum = (r + g + b) / 3;
  const blueVal = Math.min(255, Math.round(lum * 2.6 + 95));
  const greenVal = Math.round(lum * 0.9 + 25);
  const redVal = Math.round(lum * 0.4 + 10);
  return [redVal, greenVal, blueVal];
}

// 3. White / Pink variant:
// Main Black body becomes Crisp Athletic White / Light Grey.
// Accent becomes Modern Pink.
// Towel remains light grey.
function transformWhitePink(r, g, b) {
  if (r > 235 && g > 235 && b > 235) return [r, g, b];

  const isGreyTowel = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && r > 115 && r < 235;
  if (isGreyTowel) return [r, g, b];

  const isBlue = b > r + 35 && b > g && b > 80;
  if (isBlue) {
    // Accent becomes Hot/Vibrant Pink
    return [236, 72, 153];
  }

  // White text / logo in white body: make logo deep black or keep sharp
  if (r > 210 && g > 210 && b > 210) {
    return [20, 20, 25];
  }

  // Main Black body becomes Clean White / Platinum Grey
  const lum = (r + g + b) / 3;
  const whiteVal = Math.min(240, Math.round(200 + lum * 0.6));
  return [whiteVal, whiteVal, whiteVal + 2];
}

async function main() {
  const images = ['black-blue-front.jpg', 'black-blue-back.png', 'black-blue-angle.jpg', 'black-blue-sides.jpg'];

  for (const img of images) {
    const isPng = img.endsWith('.png');
    const baseName = img.replace('black-blue-', '').replace('.png', '').replace('.jpg', '');
    
    // Process variants
    await processImage(img, 'red-black', transformRedBlack);
    await processImage(img, 'blue-red', transformBlueRed);
    await processImage(img, 'white-pink', transformWhitePink);
  }

  console.log('✅ All 4 colorway variants generated with identical master construction including back view!');
}

main().catch(console.error);

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding JERSFITT Plus database with exact presentation specs...');

  // 1. Clean existing records
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Admin User
  const adminHashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@jersfitt.com',
      name: 'JERSFITT Admin',
      password: adminHashedPassword,
      role: 'ADMIN',
      phone: '+91 9876543210',
    },
  });

  // 3. Create Sample Customer User
  const customerHashedPassword = await bcrypt.hash('customer123', 10);
  const customerUser = await prisma.user.create({
    data: {
      email: 'alex.pereira@football.com',
      name: 'Alex Pereira',
      password: customerHashedPassword,
      role: 'CUSTOMER',
      phone: '+91 9812345678',
      addresses: {
        create: {
          fullName: 'Alex Pereira',
          phone: '+91 9812345678',
          address: 'Flat 402, Greenfield Sports Enclave, Stadium Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560001',
          isDefault: true,
        },
      },
    },
  });

  // 4. Create Flagship Products with official prototype images
  const productsData = [
    {
      slug: 'jersfitt-plus-black-blue',
      name: 'JERSFITT Plus — Black / Blue',
      tagline: 'The jersey with a built-in towel.',
      description:
        'The master reference edition of JERSFITT Plus in Stealth Black with athletic royal blue side panels, contrast collar, and integrated microfiber sweat-wiping towel at the inner hem.',
      price: 800,
      isFeatured: true,
      inStock: true,
      category: 'Sports Jersey',
      edition: 'Official Master Reference',
      primaryColor: 'BLACK / BLUE',
      images: JSON.stringify([
        '/images/jersey/black-blue-front.jpg',
        '/images/jersey/black-blue-back.png',
        '/images/jersey/black-blue-angle.jpg',
        '/images/jersey/black-blue-sides.jpg',
      ]),
      specifications: JSON.stringify({
        'Colorway': 'Stealth Black / Royal Blue Detailing',
        'Jersey Body': '100% Quick-Dry High-Performance Polyester',
        'Sweat-Absorbing Panel': 'Integrated Soft Microfiber Towel Panel (Light Grey)',
        'Stitching': 'Reinforced ergonomic flatlock athletic seams',
        'Fit Type': 'Modern athletic sports fit',
        'Function': 'Sweat management + quick-dry cooling in one product',
        'Recommended Sports': 'Football, Running, Gym & Fitness, Active Sports',
      }),
      careInstructions: JSON.stringify([
        'Machine wash cold (30°C) on gentle cycle with like colors',
        'Avoid chemical fabric softeners to maintain microfiber absorbency',
        'Hang dry or tumble dry low',
        'Do not iron directly over branding',
      ]),
      variants: [
        { size: 'S', sku: 'JP-BB-S', stock: 30, priceAdjustment: 0 },
        { size: 'M', sku: 'JP-BB-M', stock: 50, priceAdjustment: 0 },
        { size: 'L', sku: 'JP-BB-L', stock: 60, priceAdjustment: 0 },
        { size: 'XL', sku: 'JP-BB-XL', stock: 35, priceAdjustment: 0 },
        { size: 'XXL', sku: 'JP-BB-XXL', stock: 20, priceAdjustment: 0 },
      ],
    },
    {
      slug: 'jersfitt-plus-red-black',
      name: 'JERSFITT Plus — Red / Black',
      tagline: 'The jersey with a built-in towel.',
      description:
        'Vibrant crimson red athletic jersey with stealth black side panels, precision collar trims, and integrated microfiber sweat-absorbing panel.',
      price: 800,
      isFeatured: true,
      inStock: true,
      category: 'Sports Jersey',
      edition: 'Crimson Edition',
      primaryColor: 'RED / BLACK',
      images: JSON.stringify([
        '/images/jersey/red-black-front.jpg',
        '/images/jersey/red-black-back.png',
        '/images/jersey/red-black-angle.jpg',
        '/images/jersey/red-black-sides.jpg',
      ]),
      specifications: JSON.stringify({
        'Colorway': 'Crimson Red / Stealth Black Detailing',
        'Jersey Body': '100% Quick-Dry High-Performance Polyester',
        'Sweat-Absorbing Panel': 'Integrated Soft Microfiber Towel Panel (Light Grey)',
        'Stitching': 'Reinforced ergonomic flatlock athletic seams',
        'Fit Type': 'Modern athletic sports fit',
        'Function': 'Sweat management + quick-dry cooling in one product',
        'Recommended Sports': 'Football, Running, Gym & Fitness, Active Sports',
      }),
      careInstructions: JSON.stringify([
        'Machine wash cold (30°C) on gentle cycle with like colors',
        'Avoid chemical fabric softeners to maintain microfiber absorbency',
        'Hang dry or tumble dry low',
        'Do not iron directly over branding',
      ]),
      variants: [
        { size: 'S', sku: 'JP-RB-S', stock: 25, priceAdjustment: 0 },
        { size: 'M', sku: 'JP-RB-M', stock: 45, priceAdjustment: 0 },
        { size: 'L', sku: 'JP-RB-L', stock: 55, priceAdjustment: 0 },
        { size: 'XL', sku: 'JP-RB-XL', stock: 30, priceAdjustment: 0 },
        { size: 'XXL', sku: 'JP-RB-XXL', stock: 15, priceAdjustment: 0 },
      ],
    },
    {
      slug: 'jersfitt-plus-blue-red',
      name: 'JERSFITT Plus — Blue / Red',
      tagline: 'The jersey with a built-in towel.',
      description:
        'Electric royal blue body paired with fiery red accents and our signature integrated microfiber sweat-absorbing towel hem.',
      price: 800,
      isFeatured: true,
      inStock: true,
      category: 'Sports Jersey',
      edition: 'Royal Striker Edition',
      primaryColor: 'BLUE / RED',
      images: JSON.stringify([
        '/images/jersey/blue-red-front.jpg',
        '/images/jersey/blue-red-back.png',
        '/images/jersey/blue-red-angle.jpg',
        '/images/jersey/blue-red-sides.jpg',
      ]),
      specifications: JSON.stringify({
        'Colorway': 'Royal Blue / Crimson Red Detailing',
        'Jersey Body': '100% Quick-Dry High-Performance Polyester',
        'Sweat-Absorbing Panel': 'Integrated Soft Microfiber Towel Panel (Light Grey)',
        'Stitching': 'Reinforced ergonomic flatlock athletic seams',
        'Fit Type': 'Modern athletic sports fit',
        'Function': 'Sweat management + quick-dry cooling in one product',
        'Recommended Sports': 'Football, Running, Gym & Fitness, Active Sports',
      }),
      careInstructions: JSON.stringify([
        'Machine wash cold (30°C) on gentle cycle with like colors',
        'Avoid chemical fabric softeners to maintain microfiber absorbency',
        'Hang dry or tumble dry low',
        'Do not iron directly over branding',
      ]),
      variants: [
        { size: 'S', sku: 'JP-BR-S', stock: 20, priceAdjustment: 0 },
        { size: 'M', sku: 'JP-BR-M', stock: 40, priceAdjustment: 0 },
        { size: 'L', sku: 'JP-BR-L', stock: 50, priceAdjustment: 0 },
        { size: 'XL', sku: 'JP-BR-XL', stock: 25, priceAdjustment: 0 },
        { size: 'XXL', sku: 'JP-BR-XXL', stock: 15, priceAdjustment: 0 },
      ],
    },
    {
      slug: 'jersfitt-plus-white-pink',
      name: 'JERSFITT Plus — White / Pink',
      tagline: 'The jersey with a built-in towel.',
      description:
        'Crisp optic white sports body with modern electric pink accents and integrated quick-dry microfiber towel panel.',
      price: 800,
      isFeatured: true,
      inStock: true,
      category: 'Sports Jersey',
      edition: 'Optic Edition',
      primaryColor: 'WHITE / PINK',
      images: JSON.stringify([
        '/images/jersey/white-pink-front.jpg',
        '/images/jersey/white-pink-back.png',
        '/images/jersey/white-pink-angle.jpg',
        '/images/jersey/white-pink-sides.jpg',
      ]),
      specifications: JSON.stringify({
        'Colorway': 'Optic White / Electric Pink Detailing',
        'Jersey Body': '100% Quick-Dry High-Performance Polyester',
        'Sweat-Absorbing Panel': 'Integrated Soft Microfiber Towel Panel (Light Grey)',
        'Stitching': 'Reinforced ergonomic flatlock athletic seams',
        'Fit Type': 'Modern athletic sports fit',
        'Function': 'Sweat management + quick-dry cooling in one product',
        'Recommended Sports': 'Football, Running, Gym & Fitness, Active Sports',
      }),
      careInstructions: JSON.stringify([
        'Machine wash cold (30°C) on gentle cycle with like colors',
        'Avoid chemical fabric softeners to maintain microfiber absorbency',
        'Hang dry or tumble dry low',
        'Do not iron directly over branding',
      ]),
      variants: [
        { size: 'S', sku: 'JP-WP-S', stock: 20, priceAdjustment: 0 },
        { size: 'M', sku: 'JP-WP-M', stock: 35, priceAdjustment: 0 },
        { size: 'L', sku: 'JP-WP-L', stock: 45, priceAdjustment: 0 },
        { size: 'XL', sku: 'JP-WP-XL', stock: 25, priceAdjustment: 0 },
        { size: 'XXL', sku: 'JP-WP-XXL', stock: 10, priceAdjustment: 0 },
      ],
    },
    {
      slug: 'jersfitt-plus-performance-jersey',
      name: 'JERSFITT Plus Performance Jersey',
      tagline: 'The jersey with a built-in towel.',
      description:
        'The definitive sports jersey with an integrated microfiber sweat-absorbing towel panel combined with quick-dry polyester sports fabric designed around performance, comfort and convenience during gym, running and active outdoor sports.',
      price: 800,
      compareAtPrice: null,
      isFeatured: true,
      inStock: true,
      category: 'Sports Jersey',
      edition: 'Official Launch Edition',
      primaryColor: 'BLACK / BLUE',
      images: JSON.stringify([
        '/images/jersey/black-blue-front.jpg',
        '/images/jersey/black-blue-back.png',
        '/images/jersey/black-blue-angle.jpg',
        '/images/jersey/black-blue-sides.jpg',
      ]),
      specifications: JSON.stringify({
        'Colorway': 'Available in 4 Colorways (Black/Blue, Red/Black, Blue/Red, White/Pink)',
        'Jersey Body': '100% Quick-Dry High-Performance Polyester',
        'Sweat-Absorbing Panel': 'Integrated Soft Microfiber Towel Panel',
        'Stitching': 'Reinforced ergonomic flatlock seams',
        'Fit Type': 'Modern athletic sports fit',
        'Function': 'Sweat management + quick-dry cooling in one product',
        'Recommended Sports': 'Football, Running, Gym & Fitness, Outdoor Sports',
      }),
      careInstructions: JSON.stringify([
        'Machine wash cold (30°C) on gentle cycle with like colors',
        'Avoid chemical fabric softeners to maintain microfiber absorbency',
        'Hang dry or tumble dry low',
        'Do not iron directly over branding',
      ]),
      variants: [
        { size: 'S', sku: 'JP-MAIN-S', stock: 30, priceAdjustment: 0 },
        { size: 'M', sku: 'JP-MAIN-M', stock: 50, priceAdjustment: 0 },
        { size: 'L', sku: 'JP-MAIN-L', stock: 60, priceAdjustment: 0 },
        { size: 'XL', sku: 'JP-MAIN-XL', stock: 35, priceAdjustment: 0 },
        { size: 'XXL', sku: 'JP-MAIN-XXL', stock: 20, priceAdjustment: 0 },
      ],
    },
  ];

  const createdProducts = [];
  for (const item of productsData) {
    const { variants, ...prodData } = item;
    const p = await prisma.product.create({
      data: {
        ...prodData,
        variants: {
          create: variants,
        },
      },
    });
    createdProducts.push(p);
  }

  const jersey = createdProducts[0];

  // 5. Create Verified Reviews
  await prisma.review.createMany({
    data: [
      {
        productId: jersey.id,
        authorName: 'Rohan Sharma',
        authorEmail: 'rohan.s@footballer.in',
        rating: 5,
        title: 'Super convenient for 90-minute matches',
        comment:
          'Having the microfiber towel built inside the jersey hem makes a huge difference on the pitch. No more wiping sweat with damp sleeves.',
        isVerifiedPurchase: true,
        isApproved: true,
      },
      {
        productId: jersey.id,
        authorName: 'Vikram Menon',
        authorEmail: 'vikram.m@sportsmail.com',
        rating: 5,
        title: 'Great fabric quality and transparent ₹800 pricing',
        comment:
          'Very comfortable polyester fabric, dries quickly after sprints, and the towel integration is stitched neatly without adding bulk.',
        isVerifiedPurchase: true,
        isApproved: true,
      },
      {
        productId: jersey.id,
        authorName: 'Arjun Nair',
        authorEmail: 'arjun.n@futsalclub.org',
        rating: 4,
        title: 'Practical sportswear innovation',
        comment:
          'Solid athletic fit and genuinely useful. Solves the hassle of carrying an extra rag during training sessions.',
        isVerifiedPurchase: true,
        isApproved: true,
      },
    ],
  });

  // 6. Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'JERSFITT10',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderAmount: 800,
        maxDiscount: 200,
        isActive: true,
      },
      {
        code: 'ACTIVE100',
        discountType: 'FIXED',
        discountValue: 100,
        minOrderAmount: 1600,
        isActive: true,
      },
    ],
  });

  // 7. Create Site Settings
  await prisma.siteSetting.createMany({
    data: [
      {
        key: 'COD_ENABLED',
        value: 'true',
        description: 'Allow Cash on Delivery',
      },
      {
        key: 'COD_CHARGE',
        value: '0',
        description: 'Cash on Delivery fee (₹0 for clean checkout)',
      },
      {
        key: 'FREE_SHIPPING_THRESHOLD',
        value: '799',
        description: 'Free shipping on all jersey orders',
      },
    ],
  });

  // 8. Create Sample Orders for Demo & Tracking
  const demoOrder1 = await prisma.order.create({
    data: {
      orderNumber: 'JP-948210',
      userId: customerUser.id,
      customerName: 'Alex Pereira',
      customerEmail: 'alex.pereira@football.com',
      customerPhone: '9812345678',
      shippingAddress: 'Flat 402, Greenfield Sports Enclave, Stadium Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560001',
      orderNotes: 'Leave with security guard if not available.',
      subtotal: 800,
      shippingFee: 0,
      codCharge: 0,
      discount: 0,
      totalAmount: 800,
      paymentMethod: 'ONLINE_UPI',
      paymentStatus: 'PAID',
      razorpayOrderId: 'order_948210',
      razorpayPaymentId: 'pay_948210_success',
      orderStatus: 'SHIPPED',
      trackingNotes: 'Dispatched via Express Courier. Tracking ID: EXP-8829104',
      items: {
        create: [
          {
            productId: jersey.id,
            productName: 'JERSFITT Plus Performance Jersey',
            productImage: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1200&auto=format&fit=crop',
            size: 'L',
            quantity: 1,
            unitPrice: 800,
            totalPrice: 800,
          },
        ],
      },
    },
  });

  const demoOrder2 = await prisma.order.create({
    data: {
      orderNumber: 'JP-827104',
      customerName: 'Pooja Sundaram',
      customerEmail: 'pooja.s@activeindia.com',
      customerPhone: '9845123456',
      shippingAddress: 'Plot 12, Athlete Avenue, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560034',
      subtotal: 1600,
      shippingFee: 0,
      codCharge: 0,
      discount: 0,
      totalAmount: 1600,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      orderStatus: 'PACKED',
      trackingNotes: 'Packed and prepared for fulfillment pickup.',
      items: {
        create: [
          {
            productId: jersey.id,
            productName: 'JERSFITT Plus Performance Jersey',
            productImage: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1200&auto=format&fit=crop',
            size: 'M',
            quantity: 2,
            unitPrice: 800,
            totalPrice: 1600,
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded with clean presentation data!');
  console.log(`- Selling Price: ₹800`);
  console.log(`- Demo Order: JP-948210 (Shipped) / JP-827104 (Packed)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        foreground: "#f4f4f5",
        surface: {
          50: "#18181b",
          100: "#121215",
          200: "#0e0e11",
          300: "#09090b",
        },
        brand: {
          blue: "#2563eb",
          "blue-hover": "#1d4ed8",
          "blue-light": "#3b82f6",
          dark: "#0a0a0c",
          gray: "#71717a",
          border: "#27272a",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Barlow Condensed", "Oswald", "Arial Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

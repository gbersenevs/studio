import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4FB691",
          50: "#F2FAF7",
          100: "#D9F0E7",
          200: "#B6E1D1",
          300: "#92D3BC",
          400: "#6FC4A6",
          500: "#4FB691",
          600: "#3D9F7D",
          700: "#2F8266",
          800: "#246852",
          900: "#1D5242",
        },
        secondary: "#A4D6C2",
        tertiary: "#F3F7F4",
        surface: "#F8FBF9",
        background: "#FFFFFF",
        text: {
          DEFAULT: "#1F2A3D",
          muted: "#5A6475",
          light: "#8A93A3",
        },
        border: "#E2E7EC",
        accent: {
          turquoise: "#4FB691",
          light: "#A4D6C2",
          pale: "#EEF7F2",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)',
        'section-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;

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
          DEFAULT: "#E6B17E",
          50: "#FFF8F1",
          100: "#FCEFE2",
          200: "#F6DFC5",
          300: "#EFCEA7",
          400: "#E8BD8A",
          500: "#E6B17E",
          600: "#D49863",
          700: "#B67A4B",
          800: "#8F6235",
          900: "#704A27",
        },
        secondary: "#F3E3D3",
        tertiary: "#FAF6F1",
        surface: "#FFFCF7",
        background: "#FFFEFC",
        text: {
          DEFAULT: "#1F252D",
          muted: "#5B616B",
          light: "#8B9099",
        },
        border: "#E8E2D9",
        accent: {
          turquoise: "#E6B17E",
          light: "#F6DFC5",
          pale: "#FAF0E3",
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

import type { Config } from "tailwindcss";

const config: Config = {
  images: {
    domains: ["randomuser.me"],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      opensans: ['"Open Sans"', 'sans-serif'],
      inter: ['Inter', 'sans-serif'], 
    },
    extend: {
      fontWeight: {
        light: '400',  
        medium: '500', 
        bold: '700',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#0F172A",
        "primary-text": '#4B5675',
        "primary-text-dark": '#071437',
        "primary-text-active": '#1B84FF',
        "primary-hover": '#1B84FF',
        "primary-light": "#eff6ff",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideInRight1: "slideInRight 0.1s ease-out forwards",
        slideInRight2: "slideInRight 0.2s ease-out forwards",
        slideInRight3: "slideInRight 0.3s ease-out forwards",
        slideInRight4: "slideInRight 0.4s ease-out forwards",
        slideInRight5: "slideInRight 0.5s ease-out forwards",
        slideInRight6: "slideInRight 0.6s ease-out forwards",
        slideInRight7: "slideInRight 0.7s ease-out forwards",
        slideInRight8: "slideInRight 0.8s ease-out forwards",
        slideInRight9: "slideInRight 0.9s ease-out forwards",
        slideInRight10: "slideInRight 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;

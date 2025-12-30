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
        void: {
          950: "#020617",
          900: "#0a0f1a",
          800: "#0f172a",
          700: "#1e293b",
        },
        biolum: {
          cyan: "#22d3ee",
          teal: "#2dd4bf",
          purple: "#a78bfa",
          pink: "#f472b6",
          blue: "#60a5fa",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Crimson Pro", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "float": "float 20s ease-in-out infinite",
        "float-slow": "float 30s ease-in-out infinite",
        "float-slower": "float 40s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "drift": "drift 60s linear infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-5px)" },
          "75%": { transform: "translateY(-30px) translateX(5px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", filter: "blur(0px)" },
          "50%": { opacity: "1", filter: "blur(2px)" },
        },
        drift: {
          "0%": { transform: "translateX(-100vw) translateY(0)" },
          "100%": { transform: "translateX(100vw) translateY(-50px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
export default config;


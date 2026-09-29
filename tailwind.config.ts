import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pale-lime paper background (our own tint, not macaly's exact lime)
        paper: "#EDF5B4",
        card: "#FFFDF4",
        ink: "#181812",
        // Accents chosen to differentiate: warm coral + sun yellow + sky
        pop: "#FF5C38",
        sun: "#FFC53D",
        skyy: "#9BDCFF",
        lilac: "#D9C6FF",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "hard-sm": "3px 3px 0 #181812",
        hard: "5px 5px 0 #181812",
        "hard-lg": "8px 8px 0 #181812",
      },
    },
  },
  plugins: [],
};

export default config;

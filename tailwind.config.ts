import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./data/**/*.{json,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // Core atmosphere
        obsidian: "#080A10",
        midnight: "#101827",
        elevated: "#171C2A",
        // Text
        ink: "#F1F0EB",
        "ink-dim": "#A3A9BA",
        // Illumination / accents
        cyan: "#64E8F2",
        violet: "#9675FF",
        lime: "#D0F56B",
        // Semantic aliases used across components
        background: "#080A10",
        foreground: "#F1F0EB",
        muted: "#A3A9BA"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        eyebrow: "0.32em"
      },
      maxWidth: {
        shell: "88rem"
      },
      boxShadow: {
        glow: "0 0 90px -20px rgba(100, 232, 242, 0.45)",
        violet: "0 0 90px -20px rgba(150, 117, 255, 0.5)",
        ambient: "0 30px 80px -40px rgba(0, 0, 0, 0.9)"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "sheen-move": {
          "0%": { backgroundPosition: "-120% 0" },
          "100%": { backgroundPosition: "220% 0" }
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" }
        }
      },
      animation: {
        "float-slow": "float-slow 9s ease-in-out infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scroll-hint": "scroll-hint 1.9s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

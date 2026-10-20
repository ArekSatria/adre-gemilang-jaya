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
        background: "var(--bg-obsidian)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        brand: {
          DEFAULT: "var(--brand-gold)",
          light: "var(--brand-gold-light)",
          muted: "var(--brand-gold-muted)",
        },
        foreground: "var(--text-primary)",
        muted: "var(--text-secondary)",
        subtle: "var(--border-subtle)",
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        danger: "var(--status-danger)",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        "7xl": "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
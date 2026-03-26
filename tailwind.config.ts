import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clancy: {
          black: "#121418",
          canvas: "#121418",
          surface: "#191d24",
          raised: "#202631",
          line: "#353d4a",
          ink: "#f2ede3",
          muted: "#cbc4b8",
          fire: "#ff2e2e",
          trench: "#fce300",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-noto-kr)",
          "var(--font-noto-jp)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-fira-code)",
          "Courier New",
          "Courier",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

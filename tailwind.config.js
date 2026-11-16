const color = (name) => `rgb(var(--sq-${name}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "sq-bg": color("bg"),
        "sq-fg": color("fg"),
        "sq-surface": color("surface"),
        "sq-panel": color("panel"),
        "sq-paper": color("paper"),
        "sq-line": color("line"),
        "sq-muted": color("muted"),
        "sq-subtle": color("subtle"),
        "sq-accent": color("accent"),
        "sq-sage": color("sage"),
        ink: "#0c0d0e",
        paper: "#f4f1e8",
        lime: { DEFAULT: "#d4ff00", deep: "#c0e600" },
        neon: {
          cyan: color("cyan"),
          orange: color("orange"),
          mint: color("mint"),
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"DM Sans"', "sans-serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
        serifit: ['"Instrument Serif"', "Georgia", "serif"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseDot: { "0%, 100%": { opacity: "1" }, "50%": { opacity: ".5" } },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1DB954",
          light: "#1ed760",
          dark: "#169c46",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          surface: "#181818",
          elevated: "#242424",
          border: "#2c2c2c",
        },
        content: {
          DEFAULT: "#ffffff",
          muted: "#b3b3b3",
          faint: "#7a7a7a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(29,185,84,0.25), 0 8px 30px -8px rgba(29,185,84,0.45)",
        card: "0 10px 40px -12px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #1ed760 0%, #1DB954 55%, #169c46 100%)",
        "hero-radial":
          "radial-gradient(1200px 600px at 80% -10%, rgba(29,185,84,0.18), transparent 60%), radial-gradient(900px 500px at -10% 110%, rgba(29,185,84,0.12), transparent 55%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "scale-in": "scale-in 0.35s ease-out both",
        float: "float 5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 14s ease-in-out infinite",
        "float-slow": "float-slow 18s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "char-reveal": "char-reveal 0.4s ease-out both",
        shake: "shake 0.4s ease-in-out",
        "copy-pop": "copy-pop 0.35s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(24px, -30px) scale(1.05)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-30px, 24px) scale(1.08)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 0.9 },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "char-reveal": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
        "copy-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
}


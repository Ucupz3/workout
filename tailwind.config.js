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
          bg: "#F5F5F5",
          card: "#FFFFFF",
          text: "#000000",
          muted: "#737373",
          border: "#E5E5E5",
          accent: "#000000",
          'accent-hover': "#333333",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
      }
    },
  },
  plugins: [],
}
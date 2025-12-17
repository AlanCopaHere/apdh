/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Vinculamos la variable --font-inter que definimos en layout.tsx
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
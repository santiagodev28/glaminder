/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta personalizada basada en tu imagen
        'ocean': {
          900: '#05161A', // El más oscuro
          800: '#072E33', // Segundo más oscuro
          600: '#0891B2', // Teal medio
          400: '#22D3EE', // Cyan brillante
          200: '#67E8F9', // Cyan claro
          100: '#CFFAFE', // El más claro
        },
      },
    },
  },
  plugins: [],
}
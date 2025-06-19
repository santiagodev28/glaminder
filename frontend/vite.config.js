import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  plugins: [react(), tailwindcss()],

})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   build: {
    chunkSizeWarningLimit: 1000 // 500 ki jagah 1000 KB limit kar diya
  }
  
  
})
// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         inter: ['Inter', 'sans-serif'],
//       },
//     },
//   },
// }

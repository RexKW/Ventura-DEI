import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
   base: '/Ventura/',
   server: {
    proxy: {
      '/api/amadeus': {
        target: 'https://test.api.amadeus.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/amadeus/, '')
      }
    }
  }
})

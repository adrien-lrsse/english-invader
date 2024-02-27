import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // add this code
    proxy: {
      '/api': {
        target: 'http://172.20.0.2:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})

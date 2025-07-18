import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    watch: {
      usePolling: true // Для некоторых файловых систем
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/todos-for-the-cosmos-demo/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/graphql': 'http://localhost:3001',
    },
  },
  optimizeDeps: {
    include: ['@apollo/client', 'graphql'],
  },
})  

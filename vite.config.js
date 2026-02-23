import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy /api requests to the Express server during development.
    // Run `node server.js` in a separate terminal alongside `npm run dev`.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})

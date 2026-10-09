import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // No source maps in production: avoids publishing original source.
    sourcemap: false,
    // Keep fonts and images as separate files rather than inlined data: URIs,
    // which keeps the Content-Security-Policy simple.
    assetsInlineLimit: 0,
  },
})

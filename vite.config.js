import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Pin to a port the backend's CORS allowlist accepts (see JaMoveo Backend/server.js).
    // strictPort makes Vite fail loudly instead of silently drifting to a blocked port (e.g. 5176).
    port: 5175,
    strictPort: true,
  },
})

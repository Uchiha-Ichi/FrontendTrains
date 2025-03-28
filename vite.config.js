import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': 'http://localhost:8080', // Điều chỉnh đường dẫn phù hợp với backend
      '/v2': 'http://localhost:5000', // Điều chỉnh đường dẫn phù hợp với backend

    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173, // Optional: specify the port (default is 5173)
  },
})

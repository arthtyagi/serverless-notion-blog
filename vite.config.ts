import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(
      process.env.VERCEL_ANALYTICS_ID,
    ),
  },
  resolve: {
    alias: {
      'node-fetch': 'axios',
    },
  },
});

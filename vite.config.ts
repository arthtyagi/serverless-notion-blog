import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node-fetch': 'axios',
    },
  },
  // define: {
  //   // polyfill because of octokit
  //   global: {},
  // },
});

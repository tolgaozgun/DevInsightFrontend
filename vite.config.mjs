import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  // Required for Docker containers
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // you can replace this port with any port
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  // Docker container end
  build: {
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: '404.html', dest: 'dist' }, // configure the source and destination paths
          ],
          hook: 'writeBundle', // copy after bundle has been written
        }),
      ],
    },
  },
});

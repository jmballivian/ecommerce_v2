import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      build: {
        rollupOptions: {
          input: 'index.html' // Specify your entry point
        }
      },
      optimizeDeps: {
        include: [] // Add any dependencies you want to pre-bundle if necessary
      }
    });

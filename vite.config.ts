import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          /**
           * Split the heavy vendors out of the app chunk.
           *
           * LibLearn targets low-end Android on intermittent connections, so
           * what matters is that a returning student re-downloads as little as
           * possible. React and the Supabase client change far less often than
           * application code; separating them keeps them in cache across
           * deploys instead of being invalidated by every app change.
           */
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            supabase: ['@supabase/supabase-js'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        // Dev: forward API calls to the Express server so the browser never
        // needs the Gemini key.
        '/api': {target: 'http://localhost:3001', changeOrigin: true},
      },
    },
  };
});

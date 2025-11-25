import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Bundle analyzer plugin for performance analysis
  const plugins = [react()];
  
  if (mode === 'analyze') {
    const { analyzer } = require('vite-bundle-analyzer');
    plugins.push(analyzer());
  }

  return {
    base: '/',
    plugins,
    server: {
      port: 5173,
      open: true,
      historyApiFallback: true,
      proxy: {
        // Add any API proxies here if needed
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks more efficiently
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/database'],
            'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
            'ui-vendor': ['react-icons', 'react-toastify', '@headlessui/react']
          },
        },
      },
      // Enable chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minify with terser for better compression
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    // Enable build caching
    cacheDir: 'node_modules/.vite',
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore']
    }
  };
});
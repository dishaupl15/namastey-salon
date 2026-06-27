import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // strip all console.* in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    // Inline assets smaller than 4 KB as base64 (icons, tiny SVGs)
    assetsInlineLimit: 4096,
    // Raise warning threshold — Three.js is intentionally large
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Deterministic chunk names for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          // React core — changes rarely, cache forever
          'vendor-react':  ['react', 'react-dom'],
          // Framer Motion — separate so it doesn't block react chunk
          'vendor-motion': ['framer-motion'],
          // Three.js ecosystem — largest chunk, lazy-loaded anyway
          'vendor-three':  ['three', '@react-three/fiber', '@react-three/drei'],
          // Icons — small, but separate so tree-shaking is clean
          'vendor-icons':  ['lucide-react'],
        },
      },
    },
  },

  // Dev server tweaks
  server: {
    port: 3000,
    open: false,
  },

  // Ensure env vars are available
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
})

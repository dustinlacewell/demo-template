import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwind from 'tailwindcss'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwind]
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: '@ldlework/demo-lib-react',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
          three: 'THREE',
        }
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  }
})
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  base: 'demo-template/',
  site: "https://localhost:4321",
  vite: {
    // plugins: [
    //   qwikReact(),
    // ],
    server: {
      fs: {
        strict: false
      }
    }
  }
});
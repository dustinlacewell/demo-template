import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import qwik from '@qwikdev/astro';

import tailwind from "@astrojs/tailwind";
import { qwikReact } from '@builder.io/qwik-react/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    qwik(),
    // react({ include: "**/react/*"}), 
    tailwind()
  ],
  base: 'demo-template',
  site: "https://localhost:4321",
  vite: {
    plugins: [
      qwikReact(),
    ],
    server: {
      fs: {
        strict: false
      }
    }
  }
});
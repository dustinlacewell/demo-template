import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import qwik from '@qwikdev/astro';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    qwik({ include: "**/qwik/*" }),
    react({ include: "**/react/*"}), 
    tailwind()
  ],
  base: '/demo-template/',
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  }
});
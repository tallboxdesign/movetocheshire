import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://movetocheshire.uk',
  output: 'static',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});

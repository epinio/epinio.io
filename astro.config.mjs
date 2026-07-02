import { defineConfig } from 'astro/config';
import lit from "@semantic-ui/astro-lit";
import { remarkModifiedTime } from './src/lib/remark-modified-time.mjs';

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const PUBLIC_URL = process.env.PUBLIC_URL || 'https://epinio.io';

// https://astro.build/config
export default defineConfig({
  site: 'https://epinio.io',
  base: '/',
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  output: "static",
  integrations: [lit(), mdx(), sitemap()],
  devToolbar: { enabled: true },
  vite: {
    server: {
      hmr: { overlay: false },
      host: "0.0.0.0",
      watch: {
        usePolling: true,
      },
    },
  },
});

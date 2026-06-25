import { defineConfig } from 'astro/config';
import lit from "@semantic-ui/astro-lit";
import { remarkModifiedTime } from './src/lib/remark-modified-time.mjs';

import node from "@astrojs/node";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const PUBLIC_URL = process.env.PUBLIC_URL || 'https://epinio.io';

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_URL,
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  output: "server",
  integrations: [lit(), mdx(), sitemap()],
  adapter: node({
    mode: "standalone",
  }),
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

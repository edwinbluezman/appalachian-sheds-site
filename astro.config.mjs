import { defineConfig } from 'astro/config';

// Deployed to Cloudflare Pages at appalachiansheds.com (custom domain to be
// attached in the Cloudflare dashboard once this is live).
export default defineConfig({
  site: 'https://appalachiansheds.com',
  output: 'static',
});

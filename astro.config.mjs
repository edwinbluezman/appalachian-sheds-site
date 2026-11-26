import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Deployed to Cloudflare Pages at appalachiansheds.com (custom domain to be
// attached in the Cloudflare dashboard once this is live).
//
// Tailwind is scoped to components that opt into it (like
// SitePrepCalculator). applyBaseStyles is off so Tailwind's CSS reset never
// touches the site-wide design system already defined in Base.astro.
export default defineConfig({
  site: 'https://appalachiansheds.com',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false })],
});

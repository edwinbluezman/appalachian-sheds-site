import { defineConfig } from 'astro/config';

// Test address on GitHub Pages. When appalachiansheds.com is connected,
// site becomes 'https://appalachiansheds.com' and the base line is removed.
export default defineConfig({
  site: 'https://edwinbluezman.github.io',
  base: '/appalachian-sheds-site',
});

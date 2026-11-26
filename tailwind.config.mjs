/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Mirrors the canonical ASI palette defined in src/layouts/Base.astro
        // (:root custom properties) so Tailwind-styled components stay on-brand.
        'asi-ink': '#2B3030',
        'asi-ink-dark': '#202827',
        'asi-cream': '#F8F7F4',
        'asi-paper': '#FFFFFF',
        'asi-sand': '#E1DED8',
        'asi-gold': '#C9A06C',
        'asi-pine': '#2E473A',
      },
    },
  },
  plugins: [],
};

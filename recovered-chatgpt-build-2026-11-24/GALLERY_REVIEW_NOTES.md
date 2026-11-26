# Appalachian Sheds — Exterior Galleries Placeholder Review

- Existing photos, pricing data, calculators, and 12 approved model HTML layouts are preserved.
- Additional labeled photo slots are inserted **after** the existing exterior gallery. This intentionally avoids replacing any approved gallery or creating a second finished-interior gallery.
- 12 model gallery sets; every slot is empty and visibly labeled `PHOTO COMING SOON`.
- See `galleries/index.html` for an overview and `MODEL_GALLERY_IMAGE_CHECKLIST.csv` for photo requests.
- The actual website uses shared `/assets/gallery/model-gallery-manifest.json`, JavaScript, and CSS; this is a transitional compatible implementation. Native Astro shared component is packaged separately.
- These reserved placeholders are meant for **staging review**. Remove empty slots or conditionally hide them before customer-facing launch.
- Photos should be 4:3, accurate to the model architecture, and captioned with visible optional features. Synthetic visualizations must not be labeled actual customer installations.
- No image uploads have been added to the slot manifest yet; only the existing approved model cover images are shown on the gallery planning page.

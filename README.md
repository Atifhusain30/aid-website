# AID Website

A standalone, responsive pre-launch marketing site for the AID roadside assistance app. This is **not** the booking app or admin site. It makes no live availability claims, has no fake sign-up form, and has no app-store download links before the app launches.

## Run locally

```sh
npm test
npm run dev
```

Open http://localhost:4173. No dependencies or build step. To publish on a static host, deploy this folder with `index.html` as the entry point and no build command. GitHub Pages can also serve it from `main` / root (set Pages in the repository settings). Custom-domain DNS and public launch are separate steps.

## Before public launch

- Confirm the launch city and service hours; replace pre-launch copy only when live service is available.
- Confirm cancellation policy and driver split before treating them as final. The site explicitly labels them proposed.
- Publish approved customer terms, driver terms and privacy policy, then link them from the footer (do not publish draft legal text).
- Set up a real support address and verified contact form or email; there is deliberately no fake waitlist.
- Add official App Store / Play Store links when approved.
- Confirm final brand artwork and photograph. Hero photograph: [Jeffrey Keenan on Unsplash](https://unsplash.com/photos/a-car-driving-down-a-street-at-night-pt7kCR5A_Y4), under the [Unsplash License](https://unsplash.com/license). Downloaded local copy at `assets/night-drive.jpg`.

## Structure

- `index.html` — accessible semantic sections, SEO metadata and content
- `styles.css` — visual design, mobile layouts, reduced-motion support
- `script.js` — service tabs, mobile menu and footer date
- `tests/site.test.mjs` — structural smoke tests
- `assets/` — local AID mark (copied from app), hero photograph and social preview

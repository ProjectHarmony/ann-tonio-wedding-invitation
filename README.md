# Antonio & Annadel — Wedding Invitation Website

A premium, animated, mobile-first wedding invitation built with **React + Vite**,
**Tailwind CSS**, and **Framer Motion**.

## Quick start

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  config/
    siteConfig.js   ← names, dates, venues, timeline, reminders, ALL photo paths
    entourage.js     ← parents, sponsors, bearers, bridal party, etc.
    guests.js         ← mock RSVP guest list + lookup logic + integration notes
  components/
    Navbar.jsx
    Hero.jsx              full-screen animated hero
    Countdown.jsx         live countdown timer
    StorySection.jsx      scroll storytelling with parallax
    EventDetails.jsx      timeline strip + venue cards + reminders
    AttireGuide.jsx       dress-code color palettes
    Entourage.jsx         full entourage listing
    Gallery.jsx           photo grid + lightbox
    RSVP.jsx              guest search + confirm/decline
    Footer.jsx
    SectionReveal.jsx     reusable scroll-reveal wrapper
    SectionLabel.jsx      the rotated-script signature label
  hooks/
    useCountdown.js
```

## 1. Adding your real photos

Every photo on the site is read from **one file**: `src/config/siteConfig.js`,
in the `photos` object. Right now it points at placeholder images
(`picsum.photos`) so you can see the full design before real photos are ready.

To swap in real photos:

1. Create a folder: `src/assets/photos/`
2. Drop your image files in there (e.g. `hero.jpg`, `story-1.jpg`, `gallery-1.jpg`…)
3. At the top of `siteConfig.js`, import them:
   ```js
   import heroPhoto from '../assets/photos/hero.jpg';
   import story1 from '../assets/photos/story-1.jpg';
   ```
4. Replace the matching placeholder URL in the `photos` object with the
   imported variable, e.g.:
   ```js
   export const photos = {
     hero: heroPhoto,
     // ...
     story: [
       { src: story1, caption: 'Two families, one prayer answered.', year: 'How it began' },
       // ...
     ],
   };
   ```

No other file needs to change — every component reads from this object.

## 2. Editing wedding details

All text content — names, the ceremony/reception venues, the day-of timeline,
reminders (gift note, adults-only, RSVP deadline), and contact info — lives in
`src/config/siteConfig.js`. The countdown timer is driven by the
`weddingDateISO` constant at the top of that file.

The full entourage (parents, principal & secondary sponsors, bearers, bridal
party, little ones) lives in `src/config/entourage.js`.

## 3. RSVP guest lookup

For now, `src/config/guests.js` contains a small **mock** guest list so you
can test the search → confirm/decline flow end-to-end. Guests can be found by
typing either their **full name** (partial match, case-insensitive) or their
unique **invitation code** (e.g. `AA-0001`).

By design, the full guest list is **never rendered anywhere on the page** —
only a search result for an exact/partial match is shown, and a polite
"we couldn't find that name" message otherwise. This keeps your guest list
private even though the site itself is public.

### Going live with Google Sheets / Google Forms

Two paths, both documented in detail at the bottom of `src/config/guests.js`:

- **Option A (simplest):** Publish a Google Sheet (guest list) to the web as
  CSV, fetch + parse it in `RSVP.jsx` instead of importing the mock array.
  Use a Google Form for write-backs (the Confirm/Decline submission).
- **Option B (recommended, fully live):** Use a Google Apps Script Web App
  bound to your guest-list sheet, with a `doGet` (read guests) and `doPost`
  (write RSVP status) function. Point `findGuest()` and the `submitRSVP()`
  stub in `RSVP.jsx` at that Web App's URL.

Either way, the visual components don't need to change — they only depend on
a guest object shaped like:

```js
{
  code: 'AA-0001',
  name: 'Guest Name',
  party: ['Guest Name', '+1 Guest'],
  seats: 2,
  side: 'Principal Sponsor',
  status: 'pending', // 'pending' | 'confirmed' | 'declined'
}
```

## 4. Design notes

The visual system (deep navy, watercolor hydrangea blue, metallic silver,
warm linen background, Playfair Display + Cormorant Garamond + a Parisienne
script accent) is pulled directly from the printed invitation suite this
site is based on — including the rotated vertical script label
(`SectionLabel.jsx`) that mirrors the "the entourage" / "finer details"
marks on the physical cards, used here as the site's signature motif.

## 5. Deploying

This is a static site after `npm run build` — the `dist/` folder can be
deployed to Vercel, Netlify, GitHub Pages, or any static host.

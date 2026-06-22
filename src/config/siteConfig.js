/**
 * ──────────────────────────────────────────────────────────────────────
 *  SITE CONFIG
 *  Every editable detail of the invitation lives in this one file.
 *  Swap placeholder photos for real ones by changing the paths in the
 *  `photos` object below — nothing else in the codebase needs to change.
 *
 *  HOW TO ADD REAL PHOTOS:
 *  1. Drop your image files into  src/assets/photos/  (create the folder).
 *  2. Import them at the top of this file, e.g.
 *       import heroPhoto from '../assets/photos/hero.jpg'
 *  3. Replace the matching placeholder URL below with the imported file.
 *  Vite will bundle and optimize them automatically.
 * ──────────────────────────────────────────────────────────────────────
 */

export const couple = {
  groomFirstName: 'Antonio',
  brideFirstName: 'Annadel',
  groomFullName: 'Antonio Clavecilla Jr.',
  brideFullName: 'Annadel Pamada Prado',
  monogram: 'A & A',
  hashtag: '#AntonioAndAnnadel2026',
};

// ISO date string used to drive the countdown — edit this if the date changes.
export const weddingDateISO = '2026-10-16T13:45:00+08:00';

export const ceremony = {
  label: 'Ceremony',
  venueName: 'Archdiocesan Shrine of St. Joseph',
  venueAddress: 'San Jose, Camarines Sur',
  date: 'Friday, October 16, 2026',
  time: '1:45 PM',
  mapUrl: 'https://maps.google.com/?q=Archdiocesan+Shrine+of+St.+Joseph+San+Jose+Camarines+Sur',
};

export const reception = {
  label: 'Reception',
  venueName: 'Casa Veronica',
  venueAddress: 'Goa, Camarines Sur',
  date: 'Friday, October 16, 2026',
  time: '5:00 PM',
  mapUrl: 'https://maps.google.com/?q=Casa+Veronica+Goa+Camarines+Sur',
};

// The full day-of timeline, used for the "Wedding Timeline" strip.
export const timeline = [
  { time: '1:45 PM', label: 'Church Ceremony', icon: 'church' },
  { time: '2:30 PM', label: 'Exchange of Vows', icon: 'rings' },
  { time: '4:00 PM', label: 'Photos', icon: 'camera' },
  { time: '4:30 PM', label: 'Reception Begins', icon: 'arch' },
  { time: '5:00 PM', label: "Couple's Entrance", icon: 'couple' },
  { time: '7:00 PM', label: 'Dinner', icon: 'dinner' },
];

export const reminders = {
  giftNote:
    'In this happiest moment of our lives, your presence and prayers are more than enough. But if you desire to give nonetheless, a monetary gift will be much appreciated.',
  adultsOnly:
    'We love your children dearly, however, this celebration will be for adults only.',
  rsvpNote:
    'Due to space limitations and to keep this a personal and meaningful celebration, we are inviting only those specifically named on the invitation.',
  rsvpDeadline: 'August 31, 2026',
};

export const contact = {
  phoneNumbers: ['0950 891 5193', '0909 776 8766'],
  facebook: 'Annadel Pamada Prado',
};

export const attireGuide = {
  intro: 'We would love to see you in your attire that suits our wedding colors.',
  principalSponsors: {
    label: 'Principal Sponsors',
    description: 'Barong Tagalog with black pants · Metallic silver gray',
    palette: ['#9CA3AF', '#B8BEC6', '#CBD0D6', '#DCE0E4'],
  },
  guest: {
    label: 'Guests',
    description: 'Formal to semi-formal, in shades of blue',
    palette: ['#2438D8', '#4D6FE0', '#6E8FE8', '#9BB3EF', '#C5D4F5'],
  },
};

/**
 * PLACEHOLDER PHOTOS
 * Swap these picsum.photos URLs for real photo imports whenever they're
 * ready — every component below reads exclusively from this object.
 */
export const photos = {
  hero: 'https://picsum.photos/seed/aa-hero/1600/2000',
  ogImage: 'https://picsum.photos/seed/aa-og/1200/630',
  story: [
    {
      src: 'https://picsum.photos/seed/aa-story-1/1200/1500',
      caption: 'Two families, one prayer answered.',
      year: 'How it began',
    },
    {
      src: 'https://picsum.photos/seed/aa-story-2/1200/1500',
      caption: 'Every ordinary day became worth keeping.',
      year: 'Falling in step',
    },
    {
      src: 'https://picsum.photos/seed/aa-story-3/1200/1500',
      caption: 'He asked. She said yes before he finished.',
      year: 'The proposal',
    },
    {
      src: 'https://picsum.photos/seed/aa-story-4/1200/1500',
      caption: 'Now, the next chapter — written together.',
      year: 'October 16, 2026',
    },
  ],
  gallery: Array.from({ length: 8 }, (_, i) => ({
    src: `https://picsum.photos/seed/aa-gallery-${i + 1}/900/900`,
    alt: `Antonio and Annadel — photo ${i + 1}`,
  })),
};

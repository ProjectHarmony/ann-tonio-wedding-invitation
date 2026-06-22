/**
 * MOCK GUEST LIST
 * Stand-in data for the RSVP guest lookup. Replace with a live data source
 * later (see the integration notes at the bottom of this file and in
 * src/components/RSVP.jsx) — the lookup logic itself won't need to change,
 * only where `guests` comes from.
 *
 * Each guest can be found by full name (case-insensitive) OR by their
 * unique invitation code, so the search box in RSVP.jsx accepts either.
 */

export const guests = [
  {
    code: 'AA-0001',
    name: 'Mr. Arnolfo Ramirez',
    party: ['Mr. Arnolfo Ramirez', 'Mrs. Grace Ramirez'],
    seats: 2,
    side: 'Principal Sponsor',
    status: 'pending', // 'pending' | 'confirmed' | 'declined'
  },
  {
    code: 'AA-0002',
    name: 'Christian Baduya',
    party: ['Christian Baduya'],
    seats: 1,
    side: "Groom's Entourage — Best Man",
    status: 'pending',
  },
  {
    code: 'AA-0003',
    name: 'Khristine May Peña',
    party: ['Khristine May Peña', '+1 Guest'],
    seats: 2,
    side: "Bride's Entourage — Maid of Honor",
    status: 'confirmed',
  },
  {
    code: 'AA-0004',
    name: 'Atty. Agusto Camano',
    party: ['Atty. Agusto Camano', 'Mrs. Marissa Lastrollo'],
    seats: 2,
    side: 'Principal Sponsor',
    status: 'pending',
  },
  {
    code: 'AA-0005',
    name: 'Isaleen Ras',
    party: ['Isaleen Ras'],
    seats: 1,
    side: "Bride's Entourage — Bridesmaid",
    status: 'declined',
  },
  {
    code: 'AA-0006',
    name: 'Manuel Rosales',
    party: ['Manuel Rosales', '+1 Guest'],
    seats: 2,
    side: "Groom's Entourage — Groomsman",
    status: 'pending',
  },
];

/**
 * Look up a guest by name (partial, case-insensitive) or exact invitation code.
 */
export function findGuest(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    guests.find((g) => g.code.toLowerCase() === q) ||
    guests.find((g) => g.name.toLowerCase().includes(q)) ||
    null
  );
}

/**
 * ──────────────────────────────────────────────────────────────────────
 *  LATER INTEGRATION — GOOGLE SHEETS / GOOGLE FORMS
 *  When you're ready to go live, two simple options:
 *
 *  OPTION A — Google Sheets as the guest database (read) +
 *             Google Forms as the RSVP submission (write)
 *    1. Put your real guest list in a Google Sheet with columns:
 *       code, name, party, seats, side, status
 *    2. Publish it to the web (File → Share → Publish to web → CSV) and
 *       fetch it in RSVP.jsx with `fetch(SHEET_CSV_URL)`, parsing the CSV
 *       into the same shape as `guests` above.
 *    3. Create a Google Form with fields matching Confirm/Decline + guest
 *       code, then POST to its formResponse URL when a guest taps
 *       Confirm or Decline (see the commented-out `submitRSVP` stub in
 *       RSVP.jsx for the exact spot to wire this in).
 *
 *  OPTION B — Apps Script Web App (recommended for a 2-way live sheet)
 *    1. Open your guest-list Google Sheet → Extensions → Apps Script.
 *    2. Write a `doGet` (returns guest JSON) and `doPost` (writes RSVP
 *       status back to the sheet) function, then deploy it as a Web App.
 *    3. Replace `findGuest` above with a `fetch()` call to that Web App
 *       URL, and call the same URL on Confirm/Decline.
 *
 *  Either way, nothing in the visual components needs to change — they
 *  only depend on the shape of a "guest" object shown above.
 * ──────────────────────────────────────────────────────────────────────
 */

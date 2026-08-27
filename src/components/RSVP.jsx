import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, XCircle, Users } from 'lucide-react';
import { findGuest } from '../config/guests';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

/**
 * Swap this for a real network call once Google Sheets / Apps Script is
 * wired up (see the integration notes at the bottom of src/config/guests.js).
 *   async function submitRSVP(guestCode, status) {
 *     await fetch(APPS_SCRIPT_URL, {
 *       method: 'POST',
 *       body: JSON.stringify({ code: guestCode, status }),
 *     });
 *   }
 */
function submitRSVP(guestCode, status) {
  // Mock async write — replace with the real call described above.
  return new Promise((resolve) => setTimeout(() => resolve({ guestCode, status }), 400));
}

export default function RSVP() {
  const [query, setQuery] = useState('');
  // 'idle' | 'searching' | 'found' | 'not-found'
  const [state, setState] = useState('idle');
  const [guest, setGuest] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setState('searching');
    setTimeout(() => {
      const match = findGuest(query);
      if (match) {
        setGuest(match);
        setState('found');
      } else {
        setGuest(null);
        setState('not-found');
      }
    }, 350);
  }

  async function handleRespond(status) {
    if (!guest) return;
    setSubmitting(true);
    await submitRSVP(guest.code, status);
    setGuest((g) => ({ ...g, status }));
    setSubmitting(false);
  }

  function resetSearch() {
    setQuery('');
    setState('idle');
    setGuest(null);
  }

  return (
    <section id="rsvp" className="relative bg-linen px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-ink-700">RSVP</h2>
            <p className="mt-3 text-ink-400">
              Search your name or the code on your invitation to view your RSVP details.
            </p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel>rsvp</SectionLabel>
          </div>
        </div>

        <SectionReveal>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-300"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Your full name or invitation code"
                className="w-full rounded-full border border-ink-100 bg-white py-3.5 pl-11 pr-4 text-ink-700 placeholder:text-ink-300 focus:border-hydrangea-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-ink-700 px-6 py-3.5 text-sm uppercase tracking-widest2 text-hydrangea-100 hover:bg-ink-600 transition-colors disabled:opacity-50"
              disabled={state === 'searching'}
            >
              {state === 'searching' ? 'Searching…' : 'Find me'}
            </button>
          </form>
          <p className="mt-3 text-xs text-ink-300">
            For your privacy, names aren't listed publicly — you'll only see results that match
            exactly what's on your invitation.
          </p>
        </SectionReveal>

        <AnimatePresence mode="wait">
          {state === 'not-found' && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 rounded-2xl border border-dashed border-ink-200 bg-white/60 p-7 text-center"
            >
              <p className="font-display text-lg text-ink-700">We couldn't find that name.</p>
              <p className="mt-2 text-sm text-ink-400">
                Double-check the spelling, or try the invitation code printed on your card. If
                you believe this is a mistake, reach out to us directly — contact details are in
                The Details section above.
              </p>
              <button
                type="button"
                onClick={resetSearch}
                className="mt-4 text-sm uppercase tracking-widest2 text-hydrangea-600 hover:text-hydrangea-700"
              >
                Try again
              </button>
            </motion.div>
          )}

          {state === 'found' && guest && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 rounded-2xl border border-ink-100 bg-white/80 backdrop-blur-sm p-7 sm:p-9"
            >
              <p className="text-xs uppercase tracking-widest2 text-hydrangea-600">
                {guest.side}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink-700">{guest.name}</h3>

              <div className="mt-4 flex items-center gap-2 text-ink-500">
                <Users size={16} />
                <p className="text-sm">
                  {guest.seats} seat{guest.seats > 1 ? 's' : ''} reserved for: {guest.party.join(', ')}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {guest.status === 'confirmed' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-hydrangea-100 px-4 py-1.5 text-xs uppercase tracking-widest2 text-hydrangea-700">
                    <CheckCircle2 size={14} /> Confirmed
                  </span>
                )}
                {guest.status === 'declined' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-4 py-1.5 text-xs uppercase tracking-widest2 text-ink-500">
                    <XCircle size={14} /> Declined
                  </span>
                )}
                {guest.status === 'pending' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-xs uppercase tracking-widest2 text-amber-700">
                    Awaiting your reply
                  </span>
                )}
              </div>

              <div className="mt-7 flex gap-3">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleRespond('confirmed')}
                  className="flex-1 rounded-full bg-ink-700 py-3 text-sm uppercase tracking-widest2 text-hydrangea-100 hover:bg-ink-600 transition-colors disabled:opacity-50"
                >
                  Confirm attendance
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleRespond('declined')}
                  className="flex-1 rounded-full border border-ink-200 py-3 text-sm uppercase tracking-widest2 text-ink-500 hover:bg-ink-50 transition-colors disabled:opacity-50"
                >
                  Can't make it
                </button>
              </div>

              <button
                type="button"
                onClick={resetSearch}
                className="mt-5 text-xs uppercase tracking-widest2 text-ink-300 hover:text-ink-500"
              >
                Search a different name
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import { ExternalLink } from 'lucide-react';
import { reminders } from '../config/siteConfig';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

const RSVP_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe-an6zvWBaM70BReUpVWMeTzV2oWyMPE9_6cxO_4OgYsuk7Q/viewform?usp=sharing&ouid=105349488565775990413';

export default function RSVP() {
  return (
    <section id="rsvp" className="relative bg-linen px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-ink-700">RSVP</h2>
            <p className="mt-3 text-ink-400">
              Please let us know if you'll be joining us by filling out the form below.
            </p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel>rsvp</SectionLabel>
          </div>
        </div>

        <SectionReveal>
          <div className="flex flex-col items-center text-center rounded-2xl border border-ink-100 bg-white/80 backdrop-blur-sm p-9 sm:p-12">
            <p className="font-display text-xl text-ink-700">We can't wait to celebrate with you</p>
            <p className="mt-3 text-sm text-ink-400 max-w-sm">
              Kindly respond by {reminders.rsvpDeadline} so we can finalize the details.
            </p>
            <a
              href={RSVP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-700 px-8 py-3.5 text-sm uppercase tracking-widest2 text-hydrangea-100 hover:bg-ink-600 transition-colors"
            >
              RSVP now
              <ExternalLink size={16} />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
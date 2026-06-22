import { Church, Gem, Camera, Flower2, Users, UtensilsCrossed, MapPin, Gift, Baby, Users2 } from 'lucide-react';
import { ceremony, reception, timeline, reminders, contact } from '../config/siteConfig';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

const iconMap = {
  church: Church,
  rings: Gem,
  camera: Camera,
  arch: Flower2,
  couple: Users,
  dinner: UtensilsCrossed,
};

function VenueCard({ data, delay }) {
  return (
    <SectionReveal delay={delay} className="flex-1">
      <div className="h-full rounded-2xl border border-ink-100 bg-white/70 backdrop-blur-sm p-7 sm:p-9 shadow-xl shadow-ink-900/5">
        <p className="text-xs uppercase tracking-widest2 text-hydrangea-600">{data.label}</p>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">{data.venueName}</h3>
        <p className="mt-1 text-ink-400">{data.venueAddress}</p>

        <div className="mt-6 flex items-center gap-2 text-ink-600">
          <span className="font-display text-lg">{data.date}</span>
          <span className="text-ink-300">&middot;</span>
          <span className="font-display text-lg">{data.time}</span>
        </div>

        <a
          href={data.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-hydrangea-400 px-5 py-2.5 text-xs uppercase tracking-widest2 text-hydrangea-600 hover:bg-hydrangea-400 hover:text-white transition-colors"
        >
          <MapPin size={14} /> View on map
        </a>
      </div>
    </SectionReveal>
  );
}

function ReminderCard({ icon: Icon, title, children, delay }) {
  return (
    <SectionReveal delay={delay} className="flex-1">
      <div className="h-full rounded-2xl bg-ink-700 text-hydrangea-100 p-7 sm:p-8">
        <Icon size={22} className="text-hydrangea-300" />
        <h4 className="mt-4 font-display text-xl">{title}</h4>
        <p className="mt-2 text-sm text-hydrangea-100/80 leading-relaxed">{children}</p>
      </div>
    </SectionReveal>
  );
}

export default function EventDetails() {
  return (
    <section id="details" className="relative bg-linen-dark px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex items-start justify-between">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-ink-700">The Details</h2>
            <p className="mt-3 max-w-md text-ink-400">Everything you need to join us on the day.</p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel>finer details</SectionLabel>
          </div>
        </div>

        {/* Timeline strip */}
        <SectionReveal>
          <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-ink-100 px-4 sm:px-10 py-8 sm:py-10 overflow-x-auto">
            <div className="flex min-w-[640px] sm:min-w-0 items-start justify-between gap-2 sm:gap-4">
              {timeline.map((stop, i) => {
                const Icon = iconMap[stop.icon];
                return (
                  <div key={stop.time} className="flex flex-1 flex-col items-center text-center">
                    <div className="relative flex items-center w-full">
                      {i !== 0 && <span className="hidden sm:block flex-1 h-px bg-ink-100" />}
                      <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-hydrangea-100 text-ink-600 shrink-0">
                        <Icon size={20} />
                      </div>
                      {i !== timeline.length - 1 && (
                        <span className="hidden sm:block flex-1 h-px bg-ink-100" />
                      )}
                    </div>
                    <p className="mt-3 font-display text-sm sm:text-base text-ink-700">{stop.time}</p>
                    <p className="mt-1 text-[0.7rem] sm:text-xs text-ink-400 max-w-[5.5rem] sm:max-w-[7rem]">
                      {stop.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Venue cards */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <VenueCard data={ceremony} delay={0.05} />
          <VenueCard data={reception} delay={0.15} />
        </div>

        {/* Reminders */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <ReminderCard icon={Gift} title="With Love & Thanks" delay={0.05}>
            {reminders.giftNote}
          </ReminderCard>
          <ReminderCard icon={Baby} title="Adults Only" delay={0.12}>
            {reminders.adultsOnly}
          </ReminderCard>
          <ReminderCard icon={Users2} title="RSVP & Plus One" delay={0.19}>
            {reminders.rsvpNote} Kindly confirm on or before{' '}
            <span className="text-white">{reminders.rsvpDeadline}</span>.
          </ReminderCard>
        </div>

        <SectionReveal className="mt-8 text-center text-sm text-ink-400">
          Questions? Reach us at {contact.phoneNumbers.join(' / ')} &middot; FB: {contact.facebook}
        </SectionReveal>
      </div>
    </section>
  );
}

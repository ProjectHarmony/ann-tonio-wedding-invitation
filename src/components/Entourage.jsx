import {
  parents,
  principalSponsors,
  secondarySponsors,
  honorRoles,
  bearers,
  flowerGirls,
  bridalParty,
  littleOnes,
} from '../config/entourage';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

function RoleBlock({ role, meaning, names, delay = 0 }) {
  return (
    <SectionReveal delay={delay} className="text-center">
      <h4 className="font-script italic text-2xl sm:text-3xl text-ink-700">{role}</h4>
      {meaning && (
        <p className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-widest2 text-hydrangea-600">
          {meaning}
        </p>
      )}
      <div className="mt-3 space-y-1">
        {names.map((n) => (
          <p key={n} className="text-sm sm:text-base text-ink-700">
            {n}
          </p>
        ))}
      </div>
    </SectionReveal>
  );
}

function NameColumn({ title, names, delay = 0 }) {
  return (
    <SectionReveal delay={delay}>
      <p className="text-xs uppercase tracking-widest2 text-hydrangea-600 mb-3">{title}</p>
      <ul className="space-y-1.5">
        {names.map((n) => (
          <li key={n} className="text-sm sm:text-base text-ink-700">
            {n}
          </li>
        ))}
      </ul>
    </SectionReveal>
  );
}

export default function Entourage() {
  return (
    <section id="entourage" className="relative bg-linen px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex items-start justify-between">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-ink-700">The Entourage</h2>
            <p className="mt-3 max-w-md text-ink-400">
              With deep gratitude to those who stand beside us.
            </p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel>the entourage</SectionLabel>
          </div>
        </div>

        {/* Parents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 text-center mb-20">
          <SectionReveal>
            <p className="font-script italic text-2xl text-ink-700">{parents.groom.label}</p>
            <div className="mt-3 space-y-1">
              {parents.groom.names.map((n) => (
                <p key={n} className="text-ink-700">
                  {n}
                </p>
              ))}
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="font-script italic text-2xl text-ink-700">{parents.bride.label}</p>
            <div className="mt-3 space-y-1">
              {parents.bride.names.map((n) => (
                <p key={n} className="text-ink-700">
                  {n}
                </p>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Principal Sponsors */}
       <SectionReveal className="text-center mb-8">
          <p className="font-script italic text-xl sm:text-3xl text-ink-700">Principal Sponsors</p>
          <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest2 text-hydrangea-600">
            {principalSponsors.intro}
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl mx-auto mb-20 text-center">
          <NameColumn
            title=""
            names={principalSponsors.men}
          />
          <NameColumn
            title=""
            names={principalSponsors.women}
            delay={0.1}
          />
        </div>

        {/* Secondary Sponsors */}
        <SectionReveal className="text-center mb-8">
          <p className="font-script italic text-2xl sm:text-3xl text-ink-700">Secondary Sponsors</p>
        </SectionReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20">
          {secondarySponsors.map((s, i) => (
            <RoleBlock key={s.role} role={s.role} meaning={s.meaning} names={s.names} delay={i * 0.07} />
          ))}
        </div>

        {/* Honor roles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
          {honorRoles.map((r, i) => (
            <RoleBlock key={r.role} role={r.role} names={r.names} delay={i * 0.07} />
          ))}
        </div>

        {/* Bearers + flower girls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
          {bearers.map((b, i) => (
            <RoleBlock key={b.role} role={b.role} meaning={b.meaning} names={b.names} delay={i * 0.07} />
          ))}
        </div>
        <div className="mb-20">
          <RoleBlock role={flowerGirls.role} meaning={flowerGirls.meaning} names={flowerGirls.names} />
        </div>

        {/* Bridal party */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-20">
          <RoleBlock role={bridalParty.bridesmaids.role} names={bridalParty.bridesmaids.names} />
          <RoleBlock role={bridalParty.groomsmen.role} names={bridalParty.groomsmen.names} delay={0.1} />
        </div>

        {/* Little ones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {littleOnes.map((l, i) => (
            <RoleBlock key={l.role} role={l.role} names={l.names} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

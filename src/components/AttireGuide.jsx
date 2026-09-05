import { Shirt } from 'lucide-react';
import { attireGuide } from '../config/siteConfig';
import SectionReveal from './SectionReveal';

function PaletteRow({ group, delay }) {
  return (
    <SectionReveal delay={delay} className="flex-1">
      <div className="h-full rounded-2xl border border-ink-100 bg-white/60 backdrop-blur-sm p-7 sm:p-9">
        <Shirt size={20} className="text-hydrangea-600" />
        <h4 className="mt-4 font-display text-xl text-ink-700">{group.label}</h4>
        <p className="mt-2 text-sm text-ink-400">{group.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {group.palette.map((hex) => (
            <span
              key={hex}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-1 ring-ink-900/10"
              style={{ backgroundColor: hex }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

export default function AttireGuide() {
  return (
    <section className="relative bg-linen-dark px-6 pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        <SectionReveal className="text-center max-w-xl mx-auto mb-12">
          <h3 className="font-display text-2xl sm:text-3xl text-ink-700">Attire Guide</h3>
          <p className="mt-3 text-ink-400">{attireGuide.intro}</p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PaletteRow group={attireGuide.entourage} delay={0.05} />
          <PaletteRow group={attireGuide.principalSponsors} delay={0.12} />
          <PaletteRow group={attireGuide.guest} delay={0.2} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center">
          <SectionReveal delay={0.25} className="h-64 sm:h-72 md:h-80">
            <div className="h-full overflow-hidden rounded-2xl border border-ink-100">
              <img
                src={attireGuide.entourage.image}
                alt={attireGuide.entourage.imageAlt}
                loading="lazy"
                className="mx-auto h-full w-auto object-contain"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.32} className="h-64 sm:h-72 md:h-80">
            <div className="h-full overflow-hidden rounded-2xl border border-ink-100">
              <img
                src="/attire-guide.jpg"
                alt="Attire guide color palette reference"
                loading="lazy"
                className="mx-auto h-full w-auto object-contain"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
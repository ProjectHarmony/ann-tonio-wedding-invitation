import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { photos } from '../config/siteConfig';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

function Chapter({ photo, reversed }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${
        reversed ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-ink-900/20">
        <motion.img
          style={{ y }}
          src={photo.src}
          alt={photo.caption}
          className="absolute inset-0 h-[120%] w-full object-cover"
          loading="lazy"
        />
      </div>

      <SectionReveal delay={0.1}>
        <p className="text-xs uppercase tracking-widest2 text-ink-400">{photo.year}</p>
        <p className="mt-4 font-display text-2xl sm:text-3xl text-ink-700 text-balance leading-snug">
          {photo.caption}
        </p>
      </SectionReveal>
    </div>
  );
}

export default function StorySection() {
  return (
    <section id="story" className="relative bg-linen px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex items-start justify-between">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-ink-700">
              Written in Love
            </h2>
            <p className="mt-3 max-w-md text-ink-400">
              A tender glimpse of the love we are carrying into forever.
            </p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel>with love</SectionLabel>
          </div>
        </div>

        <div className="flex flex-col gap-20 sm:gap-28">
          {photos.story.map((photo, i) => (
            <Chapter key={photo.src} photo={photo} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

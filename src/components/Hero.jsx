import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { couple, ceremony, photos } from '../config/siteConfig';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax: the photo drifts slower than the page, the overlay text fades as you leave.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-700"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <img
          src={photos.hero}
          alt="Antonio and Annadel"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/40 to-ink-900/85" />
        <div className="absolute inset-0 bg-noise" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          variants={item}
          className="font-script italic text-hydrangea-200 text-base sm:text-lg tracking-[0.2em] uppercase mb-5"
        >
          Together with their families
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-white text-[3.4rem] sm:text-7xl md:text-8xl leading-[0.95] text-balance"
        >
          {couple.groomFirstName}
          <span className="block font-accent text-hydrangea-300 text-5xl sm:text-6xl md:text-7xl my-1 sm:my-2">
            &amp;
          </span>
          {couple.brideFirstName}
        </motion.h1>

        <motion.div variants={item} className="mt-8 flex items-center gap-4 text-hydrangea-100">
          <span className="h-px w-10 bg-hydrangea-300/70" />
          <p className="text-sm sm:text-base uppercase tracking-widest2">{ceremony.date}</p>
          <span className="h-px w-10 bg-hydrangea-300/70" />
        </motion.div>

        <motion.p variants={item} className="mt-3 text-hydrangea-200/90 text-sm sm:text-base">
          {ceremony.venueName} &middot; {ceremony.venueAddress}
        </motion.p>

        <motion.a
          variants={item}
          href="#countdown"
          className="mt-12 inline-flex flex-col items-center gap-2 text-hydrangea-100/80 hover:text-white transition-colors"
        >
          <span className="text-[0.65rem] uppercase tracking-widest2">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { photos } from '../config/siteConfig';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="relative bg-ink-700 bg-noise px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-start justify-between">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-hydrangea-100">Gallery</h2>
            <p className="mt-3 max-w-md text-hydrangea-200/70">
              A few favorite moments — tap any photo for a closer look.
            </p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel tone="light">gallery</SectionLabel>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {photos.gallery.map((photo, i) => (
            <SectionReveal key={photo.src} delay={(i % 4) * 0.06}>
              <motion.button
                type="button"
                onClick={() => setActive(photo)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative block aspect-square w-full overflow-hidden rounded-xl"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-ink-900/0 hover:bg-ink-900/10 transition-colors" />
              </motion.button>
            </SectionReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/90 p-6"
            onClick={() => setActive(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute top-5 right-5 text-hydrangea-100 hover:text-white"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

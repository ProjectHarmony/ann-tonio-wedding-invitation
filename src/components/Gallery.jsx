import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

// Grabs every image in public/prenup-photos automatically — no config needed.
// Vite serves /public as the root, so we build the list from the folder's
// known filenames via import.meta.glob against the source-relative path.
const modules = import.meta.glob('/public/prenup-photos/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const photos = Object.keys(modules)
  .sort()
  .map((path, i) => ({
    src: modules[path],
    alt: `Antonio and Annadel prenup photo ${i + 1}`,
  }));

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openAt = useCallback((i) => {
    setIndex(i);
    setLightboxOpen(true);
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    []
  );

  // Keyboard nav while the lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    function handleKey(e) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setLightboxOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, next, prev]);

  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="relative bg-ink-700 bg-noise px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-start justify-between">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-hydrangea-100">Gallery</h2>
            <p className="mt-3 max-w-md text-hydrangea-200/70">
              Every favorite moment — scroll sideways, tap any photo for the full-size view.
            </p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel tone="light">gallery</SectionLabel>
          </div>
        </div>

        <SectionReveal>
          <div className="gallery-scroll -mx-6 overflow-x-auto px-6 pb-4">
            <div className="grid h-[440px] grid-flow-col-dense grid-rows-2 auto-cols-[42vw] gap-3 sm:h-[520px] sm:auto-cols-[30vw] sm:gap-4 md:auto-cols-[220px] lg:auto-cols-[240px]">
              {photos.map((photo, i) => {
                const feature = i % 7 === 0;
                return (
                  <motion.button
                    key={photo.src}
                    type="button"
                    onClick={() => openAt(i)}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    aria-label={`View full-size: ${photo.alt}`}
                    className={`group relative block h-full w-full snap-start overflow-hidden rounded-2xl ring-1 ring-white/10 ${
                      feature ? 'col-span-2 row-span-2' : ''
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={i < 4 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        <p className="mt-4 text-center text-xs uppercase tracking-widest2 text-hydrangea-200/50">
          {photos.length} photos · scroll to browse
        </p>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/90 p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-hydrangea-100 hover:text-white"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.img
              key={index}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={photos[index].src}
              alt={photos[index].alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-hydrangea-100 hover:text-white"
            >
              <ChevronRight size={32} />
            </button>

            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
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

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
    alt: `Prenup photo ${i + 1}`,
  }));

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (newIndex, dir) => {
      setDirection(dir);
      setIndex((newIndex + photos.length) % photos.length);
    },
    []
  );

  const next = useCallback(() => goTo(index + 1, 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1, -1), [index, goTo]);

  // Keyboard nav when lightbox is open
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

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section id="gallery" className="relative bg-ink-700 bg-noise px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-start justify-between">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-hydrangea-100">Gallery</h2>
            <p className="mt-3 max-w-md text-hydrangea-200/70">
              A few favorite moments — tap the photo for a closer look.
            </p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel tone="light">gallery</SectionLabel>
          </div>
        </div>

        <SectionReveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  src={photos[index].src}
                  alt={photos[index].alt}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -5000 || offset.x < -80) next();
                    else if (swipe > 5000 || offset.x > 80) prev();
                  }}
                  onClick={() => setLightboxOpen(true)}
                  className="h-full w-full cursor-pointer object-cover"
                />
              </AnimatePresence>

              <button
                type="button"
                aria-label="Previous photo"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-900/40 p-2 text-hydrangea-100 hover:bg-ink-900/60 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-900/40 p-2 text-hydrangea-100 hover:bg-ink-900/60 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-6 bg-hydrangea-100' : 'w-1.5 bg-hydrangea-100/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </SectionReveal>
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
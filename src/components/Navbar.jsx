import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { couple } from '../config/siteConfig';

const links = [
  { href: '#story', label: 'Our Story' },
  { href: '#details', label: 'Details' },
  { href: '#entourage', label: 'Entourage' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-ink-700/90 backdrop-blur-md shadow-lg shadow-ink-900/20' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="font-display italic text-lg sm:text-xl text-hydrangea-100 tracking-wide"
        >
          {couple.monogram}
        </a>

        <ul className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest2 text-hydrangea-100/90">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-hydrangea-100 p-2 -mr-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-ink-700/95 backdrop-blur-md"
          >
            <ul className="px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-widest2 text-hydrangea-100/90">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className="block py-1">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

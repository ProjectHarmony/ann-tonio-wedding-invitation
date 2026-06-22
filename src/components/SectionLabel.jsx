import { motion } from 'framer-motion';

/**
 * The signature device of this design: a rotated cursive label running
 * along a hairline rule, exactly mirroring the "the entourage" / "finer
 * details" vertical marks on the printed invitation suite. Used to open
 * every major section so the site reads as part of the same physical
 * stationery system.
 */
export default function SectionLabel({ children, tone = 'dark' }) {
  const lineColor = tone === 'dark' ? 'bg-ink-200/60' : 'bg-hydrangea-400/60';
  const textColor = tone === 'dark' ? 'text-ink-700' : 'text-hydrangea-100';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-4 sm:gap-5"
    >
      <span className={`block h-16 sm:h-24 w-px ${lineColor}`} aria-hidden="true" />
      <span
        className={`vertical-label font-accent text-2xl sm:text-3xl ${textColor} select-none`}
      >
        {children}
      </span>
    </motion.div>
  );
}

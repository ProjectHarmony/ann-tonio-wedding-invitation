import { motion } from 'framer-motion';

/**
 * Wraps any content in a gentle fade + rise reveal that triggers once,
 * the moment it scrolls into view. Used throughout the page so every
 * section feels hand-choreographed rather than scattered.
 */
export default function SectionReveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.7,
  className = '',
  as = 'div',
}) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

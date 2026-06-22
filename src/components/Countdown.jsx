import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { weddingDateISO, couple } from '../config/siteConfig';
import SectionLabel from './SectionLabel';

function pad(n) {
  return String(n).padStart(2, '0');
}

function DigitGroup({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded-xl bg-ink-600/60 ring-1 ring-hydrangea-300/20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center font-display text-3xl sm:text-5xl text-hydrangea-100"
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[0.65rem] sm:text-xs uppercase tracking-widest2 text-hydrangea-200/80">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, total } = useCountdown(weddingDateISO);

  return (
    <section
      id="countdown"
      className="relative bg-ink-700 bg-noise px-6 py-20 sm:py-28 text-center"
    >
      <div className="mx-auto max-w-3xl flex flex-col items-center">
        <SectionLabel>countdown</SectionLabel>

        <p className="mt-8 font-script italic text-2xl sm:text-3xl text-hydrangea-100">
          {total > 0
            ? `Until ${couple.groomFirstName} meets ${couple.brideFirstName} at the altar`
            : 'Today is the day — see you there!'}
        </p>

        <div className="mt-10 flex items-center gap-3 sm:gap-6">
          <DigitGroup value={days} label="Days" />
          <span className="font-display text-2xl sm:text-4xl text-hydrangea-300/50 -mt-4 sm:-mt-7">
            :
          </span>
          <DigitGroup value={hours} label="Hours" />
          <span className="font-display text-2xl sm:text-4xl text-hydrangea-300/50 -mt-4 sm:-mt-7">
            :
          </span>
          <DigitGroup value={minutes} label="Minutes" />
          <span className="font-display text-2xl sm:text-4xl text-hydrangea-300/50 -mt-4 sm:-mt-7">
            :
          </span>
          <DigitGroup value={seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}

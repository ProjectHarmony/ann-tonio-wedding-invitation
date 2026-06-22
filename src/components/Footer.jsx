import { couple, contact } from '../config/siteConfig';
import SectionReveal from './SectionReveal';

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 px-6 py-16 sm:py-20 text-center">
      <SectionReveal>
        <p className="font-accent text-4xl sm:text-5xl text-hydrangea-200">{couple.monogram}</p>
        <p className="mt-4 text-hydrangea-100/70 max-w-md mx-auto">
          With hearts full of gratitude, thank you for being part of our story.
        </p>
        <p className="mt-6 text-xs uppercase tracking-widest2 text-hydrangea-300/70">
          {couple.hashtag}
        </p>
        <div className="mt-8 h-px w-16 bg-hydrangea-400/30 mx-auto" />
        <p className="mt-6 text-xs text-hydrangea-200/50">
          {contact.phoneNumbers.join(' · ')} &nbsp;|&nbsp; FB: {contact.facebook}
        </p>
      </SectionReveal>
    </footer>
  );
}

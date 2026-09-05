import { giftQR } from '../config/siteConfig';
import SectionLabel from './SectionLabel';
import SectionReveal from './SectionReveal';

function QRCard({ account, delay }) {
  return (
    <SectionReveal delay={delay} className="flex-1">
      <div className="h-full rounded-2xl border border-ink-100 bg-white/70 backdrop-blur-sm p-7 sm:p-9 text-center">
        <p className="text-xs uppercase tracking-widest2 text-hydrangea-600">{account.bank}</p>
        <div
          className="mx-auto mt-5 w-40 sm:w-44 overflow-hidden rounded-xl ring-1 ring-ink-900/10"
          style={account.imageAspect ? { aspectRatio: account.imageAspect } : undefined}
        >
          <img
            src={account.image}
            alt={`${account.bank} QR code for ${account.name}`}
            loading="lazy"
            className={
              account.imageAspect ? 'h-full w-full object-cover' : 'h-auto w-full object-contain'
            }
          />
        </div>
        <p className="mt-5 font-display text-lg text-ink-700">{account.name}</p>
        <p className="mt-1 text-sm text-ink-400">{account.accountLabel}</p>
        {account.note && <p className="mt-3 text-xs text-ink-300">{account.note}</p>}
      </div>
    </SectionReveal>
  );
}

export default function GiftQR() {
  return (
    <section className="relative bg-linen px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 flex items-start justify-between">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-5xl text-ink-700">A Gift of Love</h2>
            <p className="mt-3 max-w-md text-ink-400">{giftQR.intro}</p>
          </SectionReveal>
          <div className="hidden sm:block">
            <SectionLabel>with gratitude</SectionLabel>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {giftQR.accounts.map((account, i) => (
            <QRCard key={account.bank} account={account} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

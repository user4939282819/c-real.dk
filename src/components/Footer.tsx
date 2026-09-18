import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { company, footer } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { Button } from './ui/Button';

const LINK_HREFS: Record<string, string> = {
  'Om C-Real': '#om',
  Investeringstyper: '#investeringstyper',
  Projekter: '#projekter',
  Kontakt: '#kontakt',
  'Find os': '#find-os',
};

export function Footer() {
  const marquee = Array.from({ length: 6 }, () => company.name);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInView = useInView(marqueeRef);
  const marqueeControls = useAnimationControls();

  // Same as Ticker: only spend a frame on this while it's actually on screen.
  useEffect(() => {
    if (marqueeInView) {
      void marqueeControls.start({ x: ['0%', '-50%'], transition: { duration: 110, ease: 'linear', repeat: Infinity } });
    } else {
      marqueeControls.stop();
    }
  }, [marqueeInView, marqueeControls]);

  return (
    <footer className="mx-auto max-w-[1440px] px-4 pb-4 md:px-3">
      <div className="overflow-hidden rounded-card bg-card">
        <div className="grid gap-14 px-8 pt-24 pb-16 md:grid-cols-[1.4fr_1fr] md:px-12 md:pt-32">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <p className="max-w-[18ch] text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.035em] text-navy">
              {footer.statement.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <div className="mt-12">
              <Button href="#kontakt">{footer.cta}</Button>
            </div>
          </motion.div>

          <div className="grid gap-8 pt-2 sm:grid-cols-3 sm:gap-6">
            {footer.columns.map((col, i) => (
              <ul key={i} className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href={LINK_HREFS[item] ?? '#top'} className="text-[14px] text-navy transition-opacity hover:opacity-60">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
            <ul className="flex flex-col gap-3">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="group inline-flex items-center gap-2 text-[14px] text-navy transition-opacity hover:opacity-60">
                    {s.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-8 flex flex-col gap-4 border-t border-navy/20 py-6 text-[13px] text-body md:mx-12 md:flex-row md:items-center md:justify-between">
          <p>
            {company.legalName} · CVR {company.cvr} · FTID {company.ftid} · {company.address}
          </p>
          <p>{footer.copyright}</p>
        </div>

        <div ref={marqueeRef} className="overflow-hidden py-10">
          <motion.div className="flex w-max whitespace-nowrap" animate={marqueeControls}>
            {[...marquee, ...marquee].map((w, i) => (
              <span key={i} className="px-10 text-[clamp(6rem,17vw,15rem)] leading-none font-bold tracking-[-0.05em] text-navy">
                {w}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="aspect-[16/6] overflow-hidden">
          <img src={footer.photo} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      </div>
    </footer>
  );
}

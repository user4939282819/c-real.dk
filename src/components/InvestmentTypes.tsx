import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { investmentTypes } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { ArrowCircle } from './ui/ArrowCircle';
import { YieldStat } from './ui/YieldStat';
import { PhaseShowcase } from './PhaseShowcase';

/**
 * Ruled list; the active row drives the animated scene in the sticky
 * column. Driven primarily by scroll position (whichever row crosses the
 * centre band of the viewport becomes active), with hover/focus as an
 * instant override for anyone stationary and pointing at a row.
 */
export function InvestmentTypes() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
    if (rows.length === 0) return;

    // Only the band across the vertical centre of the viewport counts, so
    // the active row is always "the one you're currently looking at."
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        const index = rows.indexOf(topMost.target as HTMLAnchorElement);
        if (index !== -1) setActive(index);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="investeringstyper" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">{investmentTypes.title}</h2>
        <p className="section-sub">{investmentTypes.sub}</p>
      </motion.div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
        <div className="border-t border-navy/20">
          {investmentTypes.items.map((t, i) => (
            <motion.a
              key={t.name}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              href="#kontakt"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className={[
                'group grid gap-7 border-b border-navy/20 py-10 transition-colors duration-500 md:grid-cols-[1fr_auto] md:items-center md:px-4 md:py-12',
                i === active ? 'bg-white/70' : 'hover:bg-white/50',
              ].join(' ')}
            >
              <div className="flex items-start gap-5">
                <span className="figure mt-2 text-[13px] text-muted">0{i + 1}</span>
                <div>
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.25rem)]">{t.name}</h3>
                  <p className="mt-2 text-[16px] font-medium text-navy">{t.lead}</p>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-body">{t.text}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-8 md:justify-end">
                <YieldStat value={t.yieldValue} horizon={t.horizon} />
                <ArrowCircle />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <PhaseShowcase index={active} />
        </div>
      </div>
    </section>
  );
}

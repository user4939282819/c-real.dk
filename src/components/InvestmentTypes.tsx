import { useState } from 'react';
import { motion } from 'framer-motion';
import { investmentTypes } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { ArrowCircle } from './ui/ArrowCircle';
import { YieldStat } from './ui/YieldStat';
import { PhaseShowcase } from './PhaseShowcase';

/** Ruled list; the active row drives an animated scene in the sticky column. */
export function InvestmentTypes() {
  const [active, setActive] = useState(0);

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

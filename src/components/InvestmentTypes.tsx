import { motion } from 'framer-motion';
import { investmentTypes } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { ArrowCircle } from './ui/ArrowCircle';
import { YieldStat } from './ui/YieldStat';
import { PhaseScene } from './PhaseShowcase';

/**
 * Four ruled rows, each carrying its own scene.
 *
 * This used to be a list beside one shared panel that swapped as you
 * scrolled, which meant three of the four types had no image of their own
 * and the panel effectively only ever read as belonging to Lokalplan. Every
 * row now owns its picture, so each investment type is a complete unit you
 * can take in on its own, and each scene's push-in and live overlay start
 * when that row reaches you rather than all four firing at once.
 */
export function InvestmentTypes() {
  return (
    <section id="investeringstyper" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">{investmentTypes.title}</h2>
        <p className="section-sub">{investmentTypes.sub}</p>
      </motion.div>

      <div className="mt-10 border-t border-navy/20">
        {investmentTypes.items.map((t, i) => (
          <motion.a
            key={t.name}
            href="#kontakt"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="group grid gap-7 border-b border-navy/20 py-10 transition-colors duration-500 hover:bg-white/60 md:grid-cols-[1fr_minmax(280px,360px)] md:items-center md:gap-12 md:px-4 md:py-12"
          >
            <div className="flex items-start gap-5">
              <span className="figure mt-2 text-[13px] text-muted">0{i + 1}</span>
              <div className="min-w-0">
                <h3 className="text-[clamp(1.6rem,2.6vw,2.25rem)]">{t.name}</h3>
                <p className="mt-2 text-[16px] font-medium text-navy">{t.lead}</p>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-body">{t.text}</p>
                <div className="mt-6 flex items-center justify-between gap-8 md:justify-start md:gap-12">
                  <YieldStat value={t.yieldValue} horizon={t.horizon} />
                  <ArrowCircle />
                </div>
              </div>
            </div>

            {/* Same aspect on every row, so the four boxes line up as a column. */}
            <PhaseScene index={i} className="aspect-[4/3] w-full" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

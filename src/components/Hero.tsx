import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { company, hero, heroStats } from '../data/content';
import { EASE_EXPO } from '../lib/motion';
import { HeroCanvas } from './HeroCanvas';
import { Counter } from './ui/Counter';

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-paper"
    >
      <HeroCanvas className="absolute inset-0 -z-10 h-full w-full" />

      <motion.div
        className="mx-auto flex w-full max-w-[1560px] flex-1 flex-col justify-center px-6 pt-32 pb-16 md:px-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-navy" />
          <span className="eyebrow text-navy/60">{hero.eyebrow}</span>
        </motion.div>

        <h1 className="max-w-[17ch] text-[clamp(2.5rem,6.6vw,6.5rem)] font-semibold tracking-[-0.045em] text-navy">
          {hero.headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block will-change-transform"
                initial={{ y: '112%' }}
                animate={ready ? { y: '0%' } : {}}
                transition={{ duration: 1.15, delay: 0.4 + i * 0.09, ease: EASE_EXPO }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-lg text-lg leading-relaxed font-light text-body"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE_EXPO }}
        >
          {hero.subheadline}. Vi investerer, hvor analysen — ikke antagelsen — peger hen.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1, ease: EASE_EXPO }}
        >
          <a
            href="#kontakt"
            className="group relative overflow-hidden bg-navy px-8 py-4 text-[14px] font-medium text-white"
          >
            <span className="relative z-10">{hero.primaryCta}</span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-navy-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
          </a>

          <a
            href="#track-record"
            className="border border-line-strong px-8 py-4 text-[14px] font-medium text-navy transition-colors duration-500 hover:border-navy"
          >
            {hero.secondaryCta}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 border-t border-line bg-paper/70 backdrop-blur-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.15, ease: EASE_EXPO }}
      >
        <div className="mx-auto grid max-w-[1560px] grid-cols-1 divide-y divide-line px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col py-6 sm:px-8 sm:first:pl-0">
              <Counter
                value={stat.value}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
                suffix={stat.suffix}
                className="tnum text-[clamp(2rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.04em] text-navy"
              />
              <span className="mt-3 text-[15px] font-medium text-navy">{stat.label}</span>
              <span className="mt-1 text-[13px] text-muted">{stat.note}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-line bg-surface">
          <div className="mx-auto flex max-w-[1560px] flex-wrap items-center gap-x-8 gap-y-2 px-6 py-3.5 md:px-10">
            <span className="eyebrow text-navy/45">{company.legalName}</span>
            <span className="text-[13px] text-muted">CVR {company.cvr}</span>
            <span className="text-[13px] text-muted">FTID {company.ftid}</span>
            <span className="text-[13px] text-muted">Reguleret af Finanstilsynet</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

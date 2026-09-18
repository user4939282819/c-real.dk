import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { Button } from './ui/Button';
import { Counter } from './ui/Counter';

/**
 * A horizontal, snap-scrolling row rather than a stacked grid: this section
 * moves differently from the rest of the page on purpose, and a native
 * scroll-snap track is what keeps that touch-friendly and cheap on mobile
 * (no scroll-jacking, which would fight the site's own vertical scroll).
 */
export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.items.length;
    setActive(Math.round(el.scrollLeft / cardWidth));
  };

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.items.length;
    el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
  };

  return (
    <section id="projekter" className="mx-auto max-w-[1440px] py-14 md:py-20">
      <div className="px-4 md:px-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <h2 className="section-title">{projects.title}</h2>
          <p className="section-sub">{projects.sub}</p>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:px-16 [&::-webkit-scrollbar]:hidden"
      >
        {projects.items.map((p) => (
          <article key={p.name} className="group w-[82vw] shrink-0 snap-center overflow-hidden rounded-card bg-white sm:w-[380px]">
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                src={p.photo}
                alt={`${p.name}, ${p.status}`}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex flex-col p-5">
              <h3 className="min-h-[2.1em] text-[clamp(1.1rem,1.4vw,1.3rem)] leading-[1.15]">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <Counter value={p.headline.value} decimals={p.headline.decimals} suffix=" %" className="figure text-[clamp(1.6rem,2vw,1.9rem)] leading-none text-positive" />
                <span className="text-[13px] text-body">{p.headline.label}</span>
              </div>

              <dl className="mt-5 divide-y divide-line border-t border-line">
                {p.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[13px] text-body">{f.label}</dt>
                    <dd className={['tnum text-right text-[13px] font-semibold', 'positive' in f && f.positive ? 'text-positive' : 'text-navy'].join(' ')}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start gap-6 px-4 md:px-16">
        <div className="flex items-center gap-2">
          {projects.items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Vis projekt ${i + 1}`}
              className="h-1.5 rounded-full bg-navy transition-all duration-400"
              style={{ width: i === active ? 22 : 6, opacity: i === active ? 1 : 0.3 }}
            />
          ))}
        </div>
        <p className="text-[13px] text-muted">{projects.note}</p>
        <Button href="#udbud">{projects.more}</Button>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { process } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';

const ICONS: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M15 15l4.5 4.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-6.2 6-11a6 6 0 1 0-12 0c0 4.8 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 8 4.5-8 4.5-8-4.5L12 4Z" />
      <path d="m4 13 8 4.5 8-4.5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.3 2.4 2.4 4.8-5" />
    </>
  ),
};

/**
 * The method as a timeline: a line draws down the spine as you scroll, and
 * each step is a photo with number, title, scope and their own description.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.7'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="tilgang" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <motion.div className="lg:sticky lg:top-28 lg:self-start" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <h2 className="section-title">{process.title}</h2>
          <p className="section-sub">{process.sub}</p>
          <figure className="mt-10 border-l-2 border-positive pl-6">
            <blockquote className="text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.45] font-medium tracking-[-0.02em] text-navy">“{process.quote}”</blockquote>
            <figcaption className="mt-3 text-[14px] text-body">{process.quoteBy}</figcaption>
          </figure>
        </motion.div>

        <div className="relative">
          <div className="absolute top-2 bottom-2 left-[22px] w-px bg-line md:left-[26px]" aria-hidden />
          <motion.div className="absolute top-2 bottom-2 left-[22px] w-px origin-top bg-navy md:left-[26px]" style={{ scaleY: lineScale }} aria-hidden />

          <ol ref={listRef} className="flex flex-col gap-10">
            {process.steps.map((s, i) => (
              <motion.li
                key={s.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="grid grid-cols-[44px_1fr] gap-5 md:grid-cols-[52px_1fr] md:gap-8"
              >
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-navy bg-page text-navy md:h-[52px] md:w-[52px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {ICONS[s.icon]}
                  </svg>
                </span>

                <article className="group overflow-hidden rounded-card bg-white">
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <img
                      src={s.photo}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <span className="figure absolute top-4 left-4 rounded-full bg-navy px-3 py-1 text-[12px] text-white">0{i + 1}</span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-[clamp(1.4rem,2vw,1.8rem)]">{s.title}</h3>
                    <p className="mt-1 text-[14px] font-medium text-navy/70">{s.scope}</p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body">{s.text}</p>
                  </div>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

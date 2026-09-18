import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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

type Step = (typeof process.steps)[number];

/**
 * One stacked card: pinned via position: sticky while its own scroll runway
 * plays out, so the next card scrolls up and settles directly over it. As
 * its runway finishes, it scales down and dims slightly, selling the sense
 * that it's sinking back under the card arriving on top.
 */
function StackCard({ step, index, total }: { step: Step; index: number; total: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(trackRef, { amount: 0.5 });
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end start'] });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 0.45]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView]);

  return (
    <div ref={trackRef} className="relative h-screen" style={{ zIndex: index + 1 }}>
      {/*
        Track height equals the viewport exactly and the sticky card fills
        almost all of it: with only a few vh of slack, the moment this card
        un-sticks is effectively the same moment the next card (right below
        in the DOM, higher z-index) reaches its own sticky position, so it
        slides up and covers this one with no visible gap. A materially
        taller track than the card (what shipped first, 108vh/145vh tracks
        against a 80–92vh card) leaves a window where the outgoing card has
        released but the incoming one hasn't stuck yet — a blank gap that
        showed up intermittently depending on exact scroll position.
      */}
      <div className="sticky top-4 flex h-[96vh] items-center md:top-6">
        <motion.div style={{ scale }} className="relative h-full w-full overflow-hidden rounded-card bg-navy shadow-[0_40px_80px_-30px_rgba(20,29,61,0.55)]">
          {step.video ? (
            <video ref={videoRef} src={step.video} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="metadata" aria-hidden />
          ) : (
            <img src={step.photo} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/35 to-navy/10" />
          <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black" aria-hidden />

          <div className="absolute inset-x-0 bottom-0 p-7 md:p-14">
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 text-white md:h-14 md:w-14">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {ICONS[step.icon]}
                    </svg>
                  </span>
                  <span className="figure text-[13px] text-white/60">0{index + 1} / 0{total}</span>
                </div>
                <h3 className="mt-5 text-[clamp(1.9rem,4vw,3.25rem)] text-white">{step.title}</h3>
                <p className="mt-1 text-[14px] font-medium text-white/60">{step.scope}</p>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85 md:text-[16px]">{step.text}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** "Vores tilgang" as a stack: each phase is a big card that the next one scrolls up and settles over. */
export function Process() {
  return (
    <section id="tilgang" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div className="mx-auto max-w-2xl text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title text-center">{process.title}</h2>
        <p className="section-sub mx-auto text-center">{process.sub}</p>
        <figure className="mx-auto mt-8 max-w-lg border-l-2 border-positive pl-6 text-left">
          <blockquote className="text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.45] font-medium tracking-[-0.02em] text-navy">“{process.quote}”</blockquote>
          <figcaption className="mt-3 text-[13px] text-body">{process.quoteBy}</figcaption>
        </figure>
      </motion.div>

      <div className="relative mt-16">
        {process.steps.map((step, i) => (
          <StackCard key={step.title} step={step} index={i} total={process.steps.length} />
        ))}
      </div>
    </section>
  );
}

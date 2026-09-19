import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

/** Each card peeks this far below the one before it, so the stack reads as a deck. */
const PEEK = 20;
/** Clears the floating nav, so the pinned stack never sits underneath it. */
const TOP = 96;

/**
 * One card in the stack.
 *
 * Plain sticky siblings, nothing clever: every card is a sticky box in normal
 * flow, each pinning a little lower than the last and painting over it. Card
 * two scrolls up and settles on top of card one, leaving its top edge showing,
 * and so on down the deck. Because they all share one relative parent, none of
 * them release until the whole section is done, so the finished stack stays
 * assembled on screen.
 *
 * Two things this depends on, both of which broke it before:
 *  - No ancestor may have a transform, filter or clip-path. Any of those become
 *    the containing block and the pinning stops resolving against the page.
 *    That is why Process is not wrapped in SectionReveal in App.
 *  - The card lives inside the sticky element, never is the sticky element, so
 *    hover and scale effects on it cannot interfere with the pinning.
 */
function StackCard({ step, index, total }: { step: Step; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView]);

  return (
    <div
      ref={ref}
      /*
       * The bottom margin is the dwell: it adds flow space after the card
       * without growing the card's own box, so once this one pins it holds
       * alone on screen long enough to be read before the next card climbs
       * over it. Without it the cards sit back to back and each one starts
       * being covered the instant it arrives.
       */
      className="sticky mb-[22vh] last:mb-0"
      style={{ top: TOP + index * PEEK, zIndex: index + 1 }}
    >
      <div className="h-[66vh] overflow-hidden rounded-card bg-navy shadow-[0_-10px_60px_-12px_rgba(20,29,61,0.5)] md:h-[70vh]">
        <div className="relative h-full w-full">
          {step.video ? (
            <video ref={videoRef} src={step.video} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="metadata" aria-hidden />
          ) : (
            <img src={step.photo} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-navy/10" />

          <div className="absolute inset-x-0 bottom-0 p-7 md:p-14">
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
      </div>
    </div>
  );
}

/** "Vores tilgang" as a deck: Mikroanalyse settles on top of Makroanalyse, and so on down the stack. */
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

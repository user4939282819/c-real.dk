import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/content';
import { fadeUp, stagger, VIEWPORT } from '../lib/motion';
import { Counter } from './ui/Counter';

const ICONS: Record<string, React.ReactNode> = {
  layers: (
    <>
      <path d="m12 4 8 4.5-8 4.5-8-4.5L12 4Z" />
      <path d="m4 13 8 4.5 8-4.5" />
    </>
  ),
  area: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="1.5" />
      <path d="M9 5v14M15 5v14M5 9h14M5 15h14" opacity="0.5" />
    </>
  ),
  percent: (
    <>
      <path d="M18 6 6 18" />
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="16" r="2.2" />
    </>
  ),
  building: (
    <>
      <path d="M5 20V8l7-4 7 4v12" />
      <path d="M9 20v-5h6v5M9 11h2M13 11h2" />
    </>
  ),
};

/** A figure that counts up on entry and counts up again every time it is hovered. */
function StatCell({ stat }: { stat: (typeof stats)[number] }) {
  const [run, setRun] = useState(0);
  const positive = 'positive' in stat && stat.positive;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setRun((r) => r + 1)}
      className="group flex cursor-default flex-col gap-8 bg-navy/70 p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-navy-600/80 md:p-10"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {ICONS[stat.icon]}
        </svg>
      </span>
      <div>
        <Counter
          key={run}
          value={stat.value}
          decimals={stat.decimals}
          suffix={stat.suffix}
          duration={2}
          className={['figure block whitespace-nowrap text-[clamp(1.9rem,2.6vw,2.9rem)] leading-none', positive ? 'text-positive-soft' : 'text-white'].join(' ')}
        />
        <p className="mt-3 text-[15px] leading-snug text-white/70">{stat.label}</p>
      </div>
    </motion.div>
  );
}

/**
 * Their own hero background film (the same one that plays behind the
 * headline on c-real.dk) reused here as the backdrop for the track record
 * figures, playing only while the section is actually on screen.
 */
export function TrackRecordStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView]);

  return (
    <section id="track-record" className="mx-auto max-w-[1440px] px-4 py-6 md:px-3">
      <div ref={sectionRef} className="relative overflow-hidden rounded-card bg-navy px-8 py-16 text-white md:px-16 md:py-20">
        <video
          ref={videoRef}
          src="/video/track-record-bg.mov"
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy/75" />

        <motion.div className="relative" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <h2 className="section-title text-white">Track record</h2>
          <p className="section-sub text-white/75">Teamets gennemførte projekter som developer.</p>
        </motion.div>

        <motion.div className="relative mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-2 lg:grid-cols-4" variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          {stats.map((s) => (
            <StatCell key={s.label} stat={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { video } from '../data/content';
import { EASE_EXPO } from '../lib/motion';

/**
 * Their film, playing on its own the moment it scrolls into view (muted, as
 * browsers require for autoplay). Sound is one tap away; the frame widens as
 * it enters. On desktop the quote sits over the picture, on phones below it.
 */
export function VideoFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [muted, setMuted] = useState(true);
  const [withControls, setWithControls] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.15'] });
  const width = useTransform(scrollYProgress, [0, 1], ['86%', '100%']);
  const radius = useTransform(scrollYProgress, [0, 1], ['32px', '18px']);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView]);

  // Unmuting must happen inside the click handler itself so browsers treat it as a user gesture.
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const nextMuted = !muted;
    v.muted = nextMuted;
    v.volume = 1;
    setMuted(nextMuted);
    void v.play().catch(() => undefined);
  };

  const watchWithSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.currentTime = 0;
    setMuted(false);
    setWithControls(true);
    void v.play().catch(() => undefined);
  };

  const caption = (
    <>
      <motion.h2
        className="text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.05] tracking-[-0.035em] text-inherit"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: EASE_EXPO }}
      >
        {video.heading}
      </motion.h2>
      <motion.p
        className="mt-4 max-w-xl text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed opacity-85"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 0.85, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.12, ease: EASE_EXPO }}
      >
        “{video.quote}”
      </motion.p>
      <p className="mt-5 text-[15px]">
        <span className="font-bold">{video.name}</span>
        <span className="opacity-70">, {video.role}</span>
      </p>
    </>
  );

  const controls = (
    <div className="flex shrink-0 flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="flex h-12 items-center gap-2 rounded-full border border-white/40 bg-white/15 px-5 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 6h3l4-3v10l-4-3H2V6Z" fill="currentColor" />
          {muted ? (
            <path d="M11 6l3 4M14 6l-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          ) : (
            <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          )}
        </svg>
        {muted ? video.sound : video.mute}
      </button>
      <button
        type="button"
        onClick={watchWithSound}
        className="flex h-12 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-navy transition-transform hover:-translate-y-0.5"
      >
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
          <path d="M12 7 0 14V0l12 7Z" fill="currentColor" />
        </svg>
        {video.watch}
      </button>
    </div>
  );

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1440px] px-4 pt-6 pb-10 md:px-3 md:pt-8">
      <motion.div style={{ width, borderRadius: radius }} className="relative mx-auto aspect-[4/5] overflow-hidden bg-navy sm:aspect-[16/9] md:aspect-[21/9]">
        <video ref={videoRef} src={video.src} className="h-full w-full object-cover" muted={muted} loop playsInline autoPlay preload="auto" controls={withControls} />

        {!withControls && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-navy/10 md:from-navy/85" />
            <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-6 p-12 text-white md:flex">
              <div className="max-w-2xl">{caption}</div>
              {controls}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:hidden">{controls}</div>
          </>
        )}
      </motion.div>

      <div className="mx-auto mt-8 max-w-2xl px-2 text-navy md:hidden">{caption}</div>
    </section>
  );
}

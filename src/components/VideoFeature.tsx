import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { video } from '../data/content';
import { EASE_EXPO } from '../lib/motion';

/**
 * Their film, playing on its own the moment it scrolls into view.
 *
 * The autoplay policy is the one thing here that cannot be coded around:
 * a browser will not start an unmuted video until the page has received a
 * real user gesture. So this asks for sound first, and if the browser
 * refuses it starts the film muted anyway rather than sitting on a poster,
 * then turns the sound on at the very first gesture the visitor makes
 * anywhere on the page. In practice that is whatever they touch or click
 * next, and Chrome often grants the unmuted start outright on a site with
 * any prior engagement. Either way the film is already running by itself,
 * which is what the play button used to get in the way of.
 *
 * It still pauses when scrolled out of view and resumes on the way back.
 */
/** Sound on/off for the film. The same control at two sizes, desktop and mobile. */
function SoundToggle({ muted, onToggle, compact = false }: { muted: boolean; onToggle: () => void; compact?: boolean }) {
  const size = compact ? 15 : 16;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!muted}
      className={[
        'flex shrink-0 items-center gap-2 rounded-full border border-white/40 bg-white/15 font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25',
        compact ? 'h-11 px-4 text-[13px]' : 'h-12 px-5 text-[14px]',
      ].join(' ')}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 6h3l4-3v10l-4-3H2V6Z" fill="currentColor" />
        {muted ? (
          <path d="M11 6l3 4M14 6l-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        ) : (
          <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        )}
      </svg>
      {muted ? video.sound : video.mute}
    </button>
  );
}

export function VideoFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [muted, setMuted] = useState(false);
  /** True once the browser has refused unmuted playback and we are waiting for any gesture. */
  const [awaitingGesture, setAwaitingGesture] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.15'] });
  const width = useTransform(scrollYProgress, [0, 1], ['86%', '100%']);
  const radius = useTransform(scrollYProgress, [0, 1], ['32px', '18px']);

  // Start on arrival: ask for sound, settle for silence rather than stopping.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!inView) {
      v.pause();
      return;
    }

    let cancelled = false;
    v.volume = 1;
    v.muted = false;

    void v
      .play()
      .then(() => {
        if (!cancelled) setMuted(false);
      })
      .catch(() => {
        // Unmuted start refused. Play anyway, silently, and wait for a gesture.
        if (cancelled) return;
        v.muted = true;
        setMuted(true);
        setAwaitingGesture(true);
        void v.play().catch(() => undefined);
      });

    return () => {
      cancelled = true;
    };
  }, [inView]);

  // The first gesture anywhere on the page is enough to lift the sound.
  useEffect(() => {
    if (!awaitingGesture) return;

    const unmute = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      v.volume = 1;
      setMuted(false);
      setAwaitingGesture(false);
      void v.play().catch(() => undefined);
    };

    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, unmute, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, unmute));
  }, [awaitingGesture]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) v.volume = 1;
    setMuted(next);
    setAwaitingGesture(false);
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

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1440px] px-4 pt-6 pb-10 md:px-3 md:pt-8">
      <motion.div style={{ width, borderRadius: radius }} className="relative mx-auto aspect-[4/5] overflow-hidden bg-navy sm:aspect-[16/9] md:aspect-[21/9]">
        <video
          ref={videoRef}
          src={`${video.src}#t=0.1`}
          className="h-full w-full object-cover"
          muted={muted}
          loop
          playsInline
          preload="auto"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-navy/10 md:from-navy/85" />

        <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-6 p-12 text-white md:flex">
          <div className="max-w-2xl">{caption}</div>
          <SoundToggle muted={muted} onToggle={toggleSound} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 md:hidden">
          <SoundToggle muted={muted} onToggle={toggleSound} compact />
        </div>
      </motion.div>

      <div className="mx-auto mt-8 max-w-2xl px-2 text-navy md:hidden">{caption}</div>
    </section>
  );
}

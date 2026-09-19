import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { hero } from '../data/content';
import { EASE_EXPO } from '../lib/motion';
import { Button } from './ui/Button';

/** Full-bleed hero: the film fills the whole viewport, edge to edge, no frame. */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy">
      <motion.video
        ref={videoRef}
        src={hero.video}
        poster={hero.poster}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: imgScale }}
        muted
        loop
        playsInline
        autoPlay
        /*
         * The poster paints immediately so the hero is never an empty navy
         * box while the film arrives. preload is metadata rather than auto
         * because auto pulls the whole file before anything renders, which
         * on a phone means megabytes of cellular data spent before the
         * first frame. The film still starts on its own once it can.
         */
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/15" />

      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-6 pb-14 md:flex-row md:items-end md:justify-between md:px-12 md:pb-16 lg:px-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        <h1 className="text-[clamp(2.4rem,7vw,6.6rem)] leading-[0.98] tracking-[-0.045em] text-white md:max-w-[62%]">
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={ready ? { y: '0%' } : {}}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.1, ease: EASE_EXPO }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="flex max-w-md flex-col gap-7 md:items-end md:text-right"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.95, ease: EASE_EXPO }}
        >
          <p className="text-[clamp(1.05rem,1.35vw,1.25rem)] leading-relaxed font-medium text-white">{hero.text}</p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href={hero.primary.href} variant="light">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="glass">
              {hero.secondary.label}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

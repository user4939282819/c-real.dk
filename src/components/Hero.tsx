import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { hero, photos } from '../data/content';
import { EASE_EXPO } from '../lib/motion';
import { Button } from './ui/Button';

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="top" className="mx-auto max-w-[1440px] px-4 pt-4 md:px-3">
      <motion.div
        ref={ref}
        className="relative h-[calc(100svh-32px)] min-h-[640px] overflow-hidden rounded-card bg-navy"
        initial={{ clipPath: 'inset(4% 2% 4% 2% round 18px)', opacity: 0 }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 18px)', opacity: 1 } : {}}
        transition={{ duration: 1.3, ease: EASE_EXPO }}
      >
        <motion.img
          src={photos.nordhavn}
          alt="København set fra luften"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y: imgY, scale: imgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/10" />

        <motion.div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-6 pb-14 md:flex-row md:items-end md:justify-between md:p-12 lg:p-14"
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

      </motion.div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { banner } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { Button } from './ui/Button';

export function Banner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-16">
      <div ref={ref} className="relative aspect-[16/11] overflow-hidden rounded-card md:aspect-[21/10]">
        <motion.img src={banner.photo} alt="" className="absolute inset-0 h-[120%] w-full object-cover" style={{ y }} />
        <div className="absolute inset-0 bg-navy/50" />
        <motion.div className="absolute top-8 right-8 left-8 md:top-12 md:left-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <p className="max-w-[20ch] text-[clamp(1.6rem,3.3vw,3.1rem)] font-bold leading-[1.1] tracking-[-0.035em] text-white">{banner.quote}</p>
          <p className="mt-5 text-[15px] font-medium text-white/85">{banner.author}</p>
        </motion.div>
        <div className="absolute right-6 bottom-6 flex flex-wrap gap-3 md:right-12 md:bottom-12">
          <Button href={banner.primary.href} variant="light">
            {banner.primary.label}
          </Button>
          <Button href={banner.secondary.href} variant="glass">
            {banner.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

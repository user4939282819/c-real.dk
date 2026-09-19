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
      {/*
        No fixed aspect on a phone.
        The quote and the buttons used to be absolutely positioned inside a
        16:11 box. At 390px wide that box is about 246px tall while the quote
        alone needs more than that, so the buttons sat on top of the text and
        the last line was cut off by the frame. Here the content sits in
        normal flow and sets the height, and the picture fills whatever height
        that turns out to be. From md up there is room, so the fixed ratio and
        the overlay positioning come back.
      */}
      <div ref={ref} className="relative overflow-hidden rounded-card md:aspect-[21/10]">
        <motion.img src={banner.photo} alt="" className="absolute inset-0 h-[120%] w-full object-cover" style={{ y }} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-navy/50" />

        <div className="relative flex min-h-[340px] flex-col justify-between gap-10 p-6 sm:min-h-[400px] md:absolute md:inset-0 md:min-h-0 md:p-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <p className="max-w-[20ch] text-[clamp(1.35rem,3.3vw,3.1rem)] font-bold leading-[1.15] tracking-[-0.035em] text-white">{banner.quote}</p>
            <p className="mt-4 text-[15px] font-medium text-white/85">{banner.author}</p>
          </motion.div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
            <Button href={banner.primary.href} variant="light" className="justify-center sm:justify-start">
              {banner.primary.label}
            </Button>
            <Button href={banner.secondary.href} variant="glass" className="justify-center sm:justify-start">
              {banner.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

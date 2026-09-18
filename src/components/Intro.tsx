import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { intro } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.32'] });

  const words = intro.statement.split(' ');

  return (
    <section id="om" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <motion.div
          className="mb-14 flex items-center gap-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <span className="eyebrow text-navy/50">{intro.label}</span>
          <span className="h-px flex-1 bg-line" />
        </motion.div>

        <div ref={ref} className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <p className="col-span-full text-[clamp(1.5rem,3.3vw,3rem)] leading-[1.22] font-medium tracking-[-0.035em] text-navy lg:col-span-8">
            {words.map((word, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              >
                {word}
              </Word>
            ))}
          </p>

          <div className="col-span-full flex flex-col gap-6 lg:col-span-4 lg:pt-2">
            {intro.body.map((paragraph, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="text-[15px] leading-relaxed text-body"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

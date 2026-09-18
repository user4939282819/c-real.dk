import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { ticker } from '../data/content';

export function Ticker() {
  const track = [...ticker, ...ticker];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const controls = useAnimationControls();

  // The loop only runs while actually visible: on a page this long, an
  // untethered `repeat: Infinity` marquee keeps animating (and costing a
  // frame of work) forever, even scrolled far out of view.
  useEffect(() => {
    if (inView) {
      void controls.start({ x: ['0%', '-50%'], transition: { duration: 42, ease: 'linear', repeat: Infinity } });
    } else {
      controls.stop();
    }
  }, [inView, controls]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      <div ref={ref} className="overflow-hidden border-t border-b border-navy/15 py-6">
        <motion.div className="flex w-max items-center whitespace-nowrap" animate={controls}>
          {track.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-12 text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium tracking-[-0.02em] text-navy">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-navy/60" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

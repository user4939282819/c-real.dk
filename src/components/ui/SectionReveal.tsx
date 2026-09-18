import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Wraps a whole section so it has real presence on scroll rather than
 * appearing once and sitting static: it rises and settles into full scale
 * and opacity as it enters, holds through the middle of the viewport, then
 * gently recedes (scaled down, dimmed) as the next section takes over. Pure
 * transform/opacity, GPU-composited, one scroll listener per section, so it
 * stays cheap even on the mobile pass that just went through the site.
 */
export function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'end 0.08'] });

  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0, 1, 1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0.96, 1, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.16], [48, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }} className={className}>
      {children}
    </motion.div>
  );
}

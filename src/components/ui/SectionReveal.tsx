import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Direction = 'up' | 'left' | 'right' | 'mask';

/**
 * Wraps a whole section so it has real presence on scroll rather than
 * appearing once and sitting static. Four variants so the page doesn't move
 * the same way section after section:
 *  - up: rises and settles (the default, used most)
 *  - left / right: slides in from a side, for sections that should read as
 *    a distinct "next act" rather than a continuation
 *  - mask: reveals through a widening clip-path, a curtain-open rather than
 *    a slide, for the section that most deserves a moment (the dossier)
 * All variants hold at full presence through the middle of the viewport,
 * then gently recede (scaled down, dimmed) as the next section arrives.
 * Pure transform/opacity/clip-path, GPU-composited, one scroll listener per
 * section, so it stays cheap even on the mobile pass that just went through
 * the site.
 */
export function SectionReveal({ children, direction = 'up', className = '' }: { children: ReactNode; direction?: Direction; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'end 0.08'] });

  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0, 1, 1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0.96, 1, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.16], direction === 'up' ? [48, 0] : [0, 0]);
  const x = useTransform(scrollYProgress, [0, 0.18], direction === 'left' ? [-80, 0] : direction === 'right' ? [80, 0] : [0, 0]);
  const inset = useTransform(scrollYProgress, [0, 0.18], direction === 'mask' ? [18, 0] : [0, 0]);
  const clipPath = useTransform(inset, (v) => `inset(0 ${v}% 0 ${v}%)`);

  return (
    <motion.div
      ref={ref}
      style={direction === 'mask' ? { opacity, scale, clipPath } : { opacity, scale, x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

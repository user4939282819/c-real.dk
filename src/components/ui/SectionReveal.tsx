import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

type Direction = 'up' | 'left' | 'right' | 'mask';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A section entrance that actually reads.
 *
 * The first version of this mapped every value to scrollYProgress across the
 * whole section. On a section two or three viewports tall that spreads the
 * entrance over hundreds of pixels of scroll, so it resolves long before the
 * section is the thing you are looking at: technically animating, visually
 * nothing. This fires once, on entry, over a fixed duration, so the movement
 * happens while the section is arriving and you see it happen.
 *
 * Never wrap a section containing position: sticky in this. The transform and
 * clip-path here both create a containing block, which changes how sticky
 * descendants resolve. Process and InvestmentTypes are deliberately left
 * unwrapped in App for exactly that reason.
 */
const VARIANTS: Record<Direction, Variants> = {
  up: {
    hidden: { opacity: 0, y: 90, clipPath: 'inset(32% 0% 0% 0%)' },
    visible: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  },
  left: {
    hidden: { opacity: 0, x: -130, clipPath: 'inset(0% 0% 0% 24%)' },
    visible: { opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  },
  right: {
    hidden: { opacity: 0, x: 130, clipPath: 'inset(0% 24% 0% 0%)' },
    visible: { opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  },
  mask: {
    hidden: { opacity: 0, scale: 1.07, clipPath: 'inset(0% 22% 0% 22%)' },
    visible: { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  },
};

export function SectionReveal({ children, direction = 'up', className = '' }: { children: ReactNode; direction?: Direction; className?: string }) {
  return (
    <motion.div
      variants={VARIANTS[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.05, ease: EASE, opacity: { duration: 0.7, ease: 'easeOut' } }}
      className={className}
      style={{ willChange: 'transform, opacity, clip-path' }}
    >
      {children}
    </motion.div>
  );
}

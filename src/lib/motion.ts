import type { Variants, Transition } from 'framer-motion';

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

export const transition = (duration = 0.9, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_EXPO,
});

/** Clip-path driven line reveal, the signature entrance for headlines. */
export const maskLine: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1.1, delay: 0.06 * i, ease: EASE_EXPO },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.07 * i, ease: EASE_EXPO },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, delay: 0.08 * i, ease: EASE_EXPO },
  }),
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Horizontal rule that draws itself in. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, ease: EASE_EXPO },
  },
};

export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

import { motion } from 'framer-motion';
import { maskLine, stagger, VIEWPORT } from '../../lib/motion';

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
};

/**
 * Each line sits in its own overflow-clipped track so the text slides up
 * from behind a hard edge rather than fading — the reveal reads as typeset,
 * not animated.
 */
export function MaskedLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  as = 'h2',
}: Props) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={stagger(0.09, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            custom={i}
            variants={maskLine}
            className={`block will-change-transform ${lineClassName}`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

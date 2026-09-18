import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE_EXPO } from '../../lib/motion';

const fmt = (decimals: number) =>
  new Intl.NumberFormat('da-DK', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts once to the real figure when it enters view; tween so it lands exactly. */
export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.6,
  immediate = false,
  className = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Start on mount rather than on entering the viewport (for overlays that appear on interaction). */
  immediate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView && !immediate) return;
    const c = animate(0, value, { duration, ease: EASE_EXPO, onUpdate: setN });
    return () => c.stop();
  }, [inView, immediate, value, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {fmt(decimals).format(n)}
      {suffix}
    </span>
  );
}

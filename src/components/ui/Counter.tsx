import { useEffect, useRef, useState } from 'react';
import { useInView, useSpring } from 'framer-motion';

type Props = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

const formatter = (decimals: number) =>
  new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/** Counts to the target once, when the number first enters the viewport. */
export function Counter({ value, decimals = 0, suffix = '', prefix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(0);

  const spring = useSpring(0, { stiffness: 55, damping: 22, mass: 1 });

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  useEffect(() => spring.on('change', (latest) => setDisplay(latest)), [spring]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatter(decimals).format(display)}
      {suffix}
    </span>
  );
}

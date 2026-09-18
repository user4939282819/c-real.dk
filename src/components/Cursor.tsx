import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Trailing ring, fine pointers only so touch keeps native behaviour. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 230, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 230, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest('a, button, input, textarea, select, [data-cursor]')));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full border border-navy/35 mix-blend-multiply"
      style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hovering ? 48 : 22,
        height: hovering ? 48 : 22,
        opacity: hovering ? 1 : 0.5,
      }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

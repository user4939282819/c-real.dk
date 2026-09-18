import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Trailing ring in difference blend, so it reads on both navy and white.
 * Fine pointers only.
 *
 * Hidden whenever the pointer leaves the top document (an iframe, or the
 * window edge): `mix-blend-mode` elements badly glitch the whole page's
 * compositing in Chromium/WebKit when an iframe is present and the pointer
 * is over or near it (a long-standing browser bug, not specific to this
 * page) — hiding the blended layer there avoids it entirely, and native
 * cursor is what you'd expect over an embedded map anyway.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHot(Boolean((e.target as HTMLElement).closest('a, button, [data-cursor]')));
    };

    // relatedTarget is null when the pointer leaves the document entirely,
    // which is what happens crossing into an iframe or off the window.
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const onOver = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseover', onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[95] rounded-full border border-white mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hot ? 52 : 20, height: hot ? 52 : 20, opacity: visible ? (hot ? 1 : 0.7) : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

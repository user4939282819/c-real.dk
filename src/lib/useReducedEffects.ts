import { useEffect, useState } from 'react';

/**
 * True on a phone, or wherever the visitor has asked for less motion.
 *
 * Touch devices get the cheaper version of the heavier effects: animating
 * clip-path forces a repaint of the whole layer every frame, which a
 * mid-range phone pays for in dropped frames during exactly the scroll the
 * effect is meant to decorate. Opacity and transform are composited, so the
 * section still arrives with presence, just without the expensive part.
 *
 * Evaluated after mount rather than during render so server and first client
 * paint agree, and it re-evaluates if the preference changes.
 */
export function useReducedEffects() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const queries = [window.matchMedia('(prefers-reduced-motion: reduce)'), window.matchMedia('(pointer: coarse)')];
    const update = () => setReduced(queries.some((q) => q.matches));

    update();
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  return reduced;
}

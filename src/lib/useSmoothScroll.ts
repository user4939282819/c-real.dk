import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Lenis is driven by rAF here rather than its own loop so scroll-linked
 * Framer Motion values resolve in the same frame as the scroll position.
 */
export function useSmoothScroll(enabled: boolean) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (enabled) lenis.start();
    else lenis.stop();
  }, [enabled]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      if (lenisRef.current) {
        // No explicit offset here: Lenis already reads the target's CSS
        // scroll-margin-top (set per section) to clear the floating nav.
        // Adding an offset on top of that was double-counting the gap and
        // landing short of the section, showing the end of the previous one.
        lenisRef.current.scrollTo(target as HTMLElement, { duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

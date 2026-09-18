import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_EXPO } from '../lib/motion';
import { Logo } from './ui/Logo';

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 200);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-navy px-6 py-8 md:px-12 md:py-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: EASE_EXPO }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <Logo className="h-12 w-auto text-white md:h-14" />
          </motion.div>

          <div className="flex items-end justify-between gap-8">
            <span className="max-w-xs text-sm leading-relaxed font-light text-white/60">
              Databaseret by- og ejendomsudvikling
            </span>
            <span className="tnum text-[clamp(3rem,10vw,7rem)] leading-none font-light tracking-[-0.04em] text-white">
              {progress}
            </span>
          </div>

          <div className="mt-8 h-px w-full bg-white/20">
            <motion.div
              className="h-full origin-left bg-white"
              style={{ scaleX: progress / 100, transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

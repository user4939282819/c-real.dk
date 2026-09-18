import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type TargetAndTransition } from 'framer-motion';
import { EASE_EXPO } from '../lib/motion';
import { LOGO_LETTERS, LOGO_MARK, LOGO_VIEWBOX } from './ui/Logo';

const BUILD_MS = 3000;

/** Each letter of the wordmark arrives its own way: C, hyphen, R, E, A, L. */
const LETTER_ENTRANCES: TargetAndTransition[] = [
  { x: -30, opacity: 0 },
  { scaleX: 0, opacity: 0 },
  { y: -28, opacity: 0 },
  { rotate: -90, opacity: 0 },
  { y: 28, scale: 0.6, opacity: 0 },
  { filter: 'blur(8px)', scale: 1.5, opacity: 0 },
];

const LETTER_SETTLED: TargetAndTransition = { x: 0, y: 0, scale: 1, scaleX: 1, rotate: 0, filter: 'blur(0px)', opacity: 1 };

/** The mark arrives whole, then the wordmark is set letter by letter, each with a different entrance. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone();
    }, BUILD_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy" exit={{ y: '-100%' }} transition={{ duration: 1, ease: EASE_EXPO }}>
          <svg viewBox={LOGO_VIEWBOX} className="h-[42vmin] max-h-[420px] w-auto text-white" aria-hidden>
            <motion.path
              d={LOGO_MARK}
              fill="currentColor"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0, scale: 0.86, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE_EXPO }}
            />

            {LOGO_LETTERS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="currentColor"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={LETTER_ENTRANCES[i]}
                animate={LETTER_SETTLED}
                transition={{ duration: 0.8, delay: 1.3 + i * 0.13, ease: EASE_EXPO }}
              />
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import { ticker } from '../data/content';

export function Ticker() {
  const track = [...ticker, ...ticker];
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      <div className="overflow-hidden border-t border-b border-navy/15 py-6">
        <motion.div className="flex w-max items-center whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 42, ease: 'linear', repeat: Infinity }}>
          {track.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-12 text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium tracking-[-0.02em] text-navy">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-navy/60" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

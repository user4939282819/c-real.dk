import { motion } from 'framer-motion';
import { EASE_EXPO, VIEWPORT } from '../../lib/motion';
import { Counter } from './Counter';

const R = 30;
const C = 2 * Math.PI * R;
const SCALE_MAX = 28;

/** Expected return as a bold counting figure with a thin arc drawn to the same scale. */
export function YieldStat({ value, horizon }: { value: number; horizon: string }) {
  const share = Math.min(1, value / SCALE_MAX);

  return (
    <div className="flex items-center gap-5">
      <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0 -rotate-90" aria-hidden>
        <circle cx="36" cy="36" r={R} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-line" />
        <motion.circle
          cx="36"
          cy="36"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-positive"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - share) }}
          viewport={VIEWPORT}
          transition={{ duration: 1.6, ease: EASE_EXPO, delay: 0.2 }}
        />
      </svg>
      <div>
        <Counter value={value} prefix="+" suffix=" %" className="figure block text-[clamp(2rem,3vw,2.75rem)] leading-none text-positive" />
        <p className="mt-2 text-[14px] text-body">Forventet afkast, {horizon.toLowerCase()}</p>
      </div>
    </div>
  );
}

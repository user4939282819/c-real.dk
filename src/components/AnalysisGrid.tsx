import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

const COLS = 14;
const ROWS = 14;
const TOTAL = COLS * ROWS;

function seeded(i: number) {
  return (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1;
}

/**
 * Cells carry a tier: all survive the macro pass, a cluster survives the
 * micro pass, one location survives both. This is the method, drawn.
 */
const CELLS = Array.from({ length: TOTAL }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const distance = Math.hypot(col - 9.5, row - 5.5);
  const noise = seeded(i);
  const tier = distance < 3.2 && noise > 0.35 ? (distance < 1.6 && noise > 0.62 ? 3 : 2) : 1;
  return { i, tier, noise };
});

const TARGET = CELLS.reduce(
  (best, cell) => (cell.tier === 3 && cell.noise > best.noise ? cell : best),
  CELLS[0]
);

const STAGES = [
  { label: 'Landsdækkende', note: 'Hele Danmark i analysen' },
  { label: 'Region · Landsdel · Kommune', note: 'Makroanalyse indsnævrer feltet' },
  { label: 'By', note: 'Mikroanalyse, trin 1' },
  { label: 'Lokation', note: 'Mikroanalyse, trin 2' },
];

export function AnalysisGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = p < 0.28 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3;
    setStage((current) => (current === next ? current : next));
  });

  return (
    <div ref={ref} className="border border-line bg-paper p-6 md:p-8">
      <div
        className="grid gap-[3px] md:gap-1"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        aria-hidden
      >
        {CELLS.map((cell) => {
          const isTarget = cell.i === TARGET.i;
          const survives =
            stage === 0
              ? true
              : stage === 1
                ? cell.tier >= 2
                : stage === 2
                  ? cell.tier >= 3
                  : isTarget;

          return (
            <span
              key={cell.i}
              className={[
                'aspect-square transition-all ease-[cubic-bezier(0.16,1,0.3,1)]',
                survives ? (isTarget && stage === 3 ? 'bg-navy' : 'bg-navy/55') : 'bg-line',
              ].join(' ')}
              style={{
                transitionDuration: '700ms',
                transitionDelay: `${(cell.noise * 240).toFixed(0)}ms`,
                transform: isTarget && stage === 3 ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          );
        })}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
        <div>
          <span className="eyebrow text-navy/45">Analyseniveau</span>
          <p className="mt-1.5 text-[15px] font-medium text-navy">{STAGES[stage].label}</p>
        </div>
        <span className="text-right text-[13px] text-muted">{STAGES[stage].note}</span>
      </div>
    </div>
  );
}

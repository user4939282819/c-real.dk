import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_EXPO } from '../lib/motion';
import { Counter } from './ui/Counter';

type Scene = {
  photo: string;
  alt: string;
  phase: string;
  title: string;
  /** CSS object-position, so the crop keeps the part of the photo that matters. */
  focus?: string;
  overlay?: ReactNode;
};

/** Photographs with a slow push-in; each phase adds one small live element. */
const SCENES: Scene[] = [
  {
    photo: '/phases/lokalplan.jpg',
    alt: 'Danmark set fra satellit (NASA MODIS)',
    phase: 'Fase 01',
    title: 'Vækstzoner identificeres landsdækkende',
    focus: '70% 50%',
    overlay: (
      <>
        {/* Helsinge sits just inland of Sjælland's north coast; coordinates match the crop above. */}
        <span className="absolute" style={{ left: '77%', top: '44%' }}>
          <motion.span
            className="absolute -top-6 -left-6 block h-12 w-12 rounded-full border border-positive-soft"
            animate={{ scale: [0.6, 1.6], opacity: [0.9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
          <span className="absolute -top-1.5 -left-1.5 block h-3 w-3 rounded-full bg-positive-soft shadow-[0_0_12px_rgba(79,220,122,0.9)]" />
          <span className="absolute top-3 right-4 whitespace-nowrap rounded-full bg-navy/80 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">Helsinge</span>
        </span>
      </>
    ),
  },
  {
    photo: '/phases/byggetilladelse.jpg',
    alt: 'Tegninger og projektering',
    phase: 'Fase 02',
    title: 'Fra grund til realiserbart projekt',
    overlay: (
      <motion.div
        className="absolute top-6 right-6 rotate-[-8deg] rounded-md border-2 border-positive-soft bg-navy/40 px-4 py-2 text-[13px] font-bold tracking-[0.08em] text-positive-soft uppercase backdrop-blur-sm md:top-8 md:right-8"
        initial={{ opacity: 0, scale: 1.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: EASE_EXPO }}
      >
        Byggetilladelse
      </motion.div>
    ),
  },
  {
    photo: '/phases/opforelse.jpg',
    alt: 'Byggeplads set fra luften',
    phase: 'Fase 03',
    title: '105 boliger under opførelse',
    overlay: (
      <div className="absolute top-6 right-6 left-6 md:top-8 md:right-8 md:left-8">
        <div className="flex items-center justify-between text-[12px] font-semibold text-white">
          <span>Byggeri</span>
          <span>18 måneder</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25">
          <motion.div className="h-full rounded-full bg-positive-soft" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3.2, delay: 0.4, ease: EASE_EXPO }} />
        </div>
      </div>
    ),
  },
  {
    photo: '/phases/udlejning.jpg',
    alt: 'Færdig boligejendom ved havnen i København',
    phase: 'Fase 04',
    focus: '55% 50%',
    title: 'Løbende udbytte og opsparing',
    overlay: (
      <div className="absolute top-6 right-6 text-right md:top-8 md:right-8">
        <Counter value={7} prefix="+" suffix=" %" duration={2.4} immediate className="figure block whitespace-nowrap text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none text-positive-soft drop-shadow" />
        <p className="mt-1 text-[12px] font-medium text-white">årligt afkast</p>
      </div>
    ),
  },
];

/**
 * One phase's scene, living in its own box beside its row rather than all
 * four sharing a single panel. The push-in and the live overlay only start
 * once the box is actually on screen, so each one plays as you reach it
 * instead of all four having run before you got there.
 */
export function PhaseScene({ index, className = '' }: { index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const scene = SCENES[index] ?? SCENES[0];

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-card bg-navy ${className}`}>
      <motion.img
        src={scene.photo}
        alt={scene.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: scene.focus ?? '50% 50%' }}
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1.14 } : { scale: 1.06 }}
        transition={{ duration: 9, ease: 'linear' }}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-navy/10" />
      {inView && scene.overlay}
      <div className="absolute right-6 bottom-6 left-6">
        <p className="text-[13px] text-white/70">{scene.phase}</p>
        <p className="text-[clamp(1.1rem,1.5vw,1.45rem)] font-bold tracking-[-0.03em] text-white">{scene.title}</p>
      </div>
    </div>
  );
}

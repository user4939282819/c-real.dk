import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { useReducedEffects } from '../../lib/useReducedEffects';

type Direction = 'up' | 'left' | 'right' | 'mask';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * A section entrance that actually reads, driven by CSS rather than by a
 * motion component.
 *
 * Two things had to be true. It must fire on entry over a fixed duration:
 * an earlier version mapped every value to scrollYProgress across the whole
 * section, which on a section three viewports tall spread the entrance over
 * hundreds of pixels of scroll and resolved long before the section was what
 * you were looking at. And it must not be a motion component, because framer
 * defers a child's whileInView animation while its motion parent has not
 * finished its own. Nearly every section's contents animate themselves with
 * fadeUp, so wrapping them made the two triggers race: in About, any child
 * that crossed its own trigger band while this wrapper was still hidden
 * never animated at all, which is how the section ended up showing its copy
 * but neither of its photos. Traced step by step, the left photo passed
 * through its entire band at opacity 0 while the wrapper was still waiting.
 *
 * So the wrapper is a plain div. useInView only reads a ref and renders
 * nothing, so there is no parent-child motion tree here to orchestrate, and
 * every child animates on its own observer exactly as it would unwrapped.
 *
 * Still never wrap a section containing position: sticky in this: the
 * transform and clip-path both create a containing block, which changes how
 * sticky descendants resolve. Process is deliberately left unwrapped.
 */
const HIDDEN: Record<Direction, CSSProperties> = {
  up: { opacity: 0, transform: 'translate3d(0, 90px, 0)', clipPath: 'inset(32% 0% 0% 0%)' },
  left: { opacity: 0, transform: 'translate3d(-130px, 0, 0)', clipPath: 'inset(0% 0% 0% 24%)' },
  right: { opacity: 0, transform: 'translate3d(130px, 0, 0)', clipPath: 'inset(0% 24% 0% 0%)' },
  mask: { opacity: 0, transform: 'scale(1.07)', clipPath: 'inset(0% 22% 0% 22%)' },
};

const SHOWN: CSSProperties = { opacity: 1, transform: 'none', clipPath: 'inset(0% 0% 0% 0%)' };

/** Phones and reduced-motion get composited properties only: no clip-path, shorter travel. */
const LIGHT_HIDDEN: CSSProperties = { opacity: 0, transform: 'translate3d(0, 40px, 0)' };
const LIGHT_SHOWN: CSSProperties = { opacity: 1, transform: 'none' };

export function SectionReveal({ children, direction = 'up', className = '' }: { children: ReactNode; direction?: Direction; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedEffects();
  /*
   * once: true, with a bottom margin so it fires as the top edge crosses the
   * lower eighth of the viewport. Height independent on purpose: an amount
   * fraction would make a tall section push hundreds of pixels past the fold
   * before anything started, which reads as the section not being there.
   */
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });

  const state = reduced ? (inView ? LIGHT_SHOWN : LIGHT_HIDDEN) : inView ? SHOWN : HIDDEN[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...state,
        transition: reduced
          ? `opacity 600ms ${EASE}, transform 600ms ${EASE}`
          : `opacity 700ms ease-out, transform 1050ms ${EASE}, clip-path 1050ms ${EASE}`,
        // Only hint the compositor while there is still something to animate.
        willChange: inView ? undefined : 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

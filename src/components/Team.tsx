import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { team } from '../data/content';
import { EASE_EXPO, fadeUp, VIEWPORT } from '../lib/motion';

const AUTOPLAY_MS = 5200;

/**
 * Leadership carousel. The active portrait sits large and centred; the
 * neighbours recede and dim. Drag, arrows, dots and keyboard all move it.
 */
export function Team() {
  const people = team.people;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + people.length) % people.length), [people.length]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const person = people[index];

  return (
    <section id="team" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">
          {team.title} <span className="whitespace-nowrap">C-Real</span>
        </h2>
        <p className="section-sub">{team.sub}</p>
      </motion.div>

      <div
        className="relative mt-10 outline-none"
        role="region"
        aria-roledescription="karrusel"
        aria-label="Ledelsen"
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <motion.div
          className="flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
        >
          {people.map((p, i) => {
            const offset = ((i - index + people.length + Math.floor(people.length / 2)) % people.length) - Math.floor(people.length / 2);
            const active = offset === 0;
            const hidden = Math.abs(offset) > 1;
            return (
              <motion.button
                key={p.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Vis ${p.name}`}
                aria-current={active}
                className="absolute aspect-[3/4] w-[68vw] max-w-[380px] cursor-pointer overflow-hidden rounded-card md:w-[30vw]"
                animate={{
                  x: `${offset * 82}%`,
                  scale: active ? 1 : 0.82,
                  opacity: hidden ? 0 : active ? 1 : 0.45,
                  zIndex: active ? 2 : 1,
                }}
                transition={{ duration: 0.9, ease: EASE_EXPO }}
                style={{ pointerEvents: hidden ? 'none' : 'auto' }}
              >
                <img src={p.photo} alt={p.name} className="h-full w-full object-cover object-[center_22%]" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              </motion.button>
            );
          })}
          {/* Spacer so the absolute cards have a stage to sit on. */}
          <div className="aspect-[3/4] w-[68vw] max-w-[380px] md:w-[30vw]" aria-hidden />
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
            >
              <p className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.03em] text-navy">{person.name}</p>
              <p className="mt-1 text-[15px] text-body">{person.role}</p>
              <div className="mt-5 flex flex-col items-center gap-3">
                <a
                  href={`tel:${person.phone.replace(/\s/g, '')}`}
                  className="group inline-flex w-full max-w-[260px] items-center justify-center gap-2.5 rounded-full bg-navy py-3 pr-5 pl-3 text-[15px] font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                    </svg>
                  </span>
                  <span className="tnum">{person.phone}</span>
                </a>
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex w-full max-w-[260px] items-center justify-center rounded-full border border-navy/25 px-5 py-3 text-[14px] font-medium text-navy transition-colors hover:border-navy"
                >
                  {person.email}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Forrige"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {people.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Gå til ${p.name}`}
                  className="h-2 rounded-full bg-navy transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: i === index ? 28 : 8, opacity: i === index ? 1 : 0.3 }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Næste"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

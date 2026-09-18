import { motion } from 'framer-motion';
import { trackRecord } from '../data/content';
import { EASE_EXPO, fadeUp, VIEWPORT } from '../lib/motion';
import { Counter } from './ui/Counter';

const SCALE_MAX = 32;

/** Inverted block — the strongest numbers in the deck get the strongest contrast. */
export function TrackRecord() {
  return (
    <section id="track-record" className="bg-navy py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <motion.div
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div>
            <span className="eyebrow text-white/50">{trackRecord.label}</span>
            <h2 className="mt-5 text-[clamp(2rem,4.6vw,4rem)] text-white">{trackRecord.title}</h2>
          </div>
          <p className="text-[14px] text-white/60">{trackRecord.lead}</p>
        </motion.div>

        <div className="border-t border-white/15">
          {trackRecord.projects.map((project, i) => {
            const realized = project.realized;
            const expectedWidth = (project.expected / SCALE_MAX) * 100;
            const realizedWidth = realized ? (realized / SCALE_MAX) * 100 : 0;
            const beat = realized ? realized - project.expected : null;

            return (
              <motion.article
                key={project.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="grid gap-8 border-b border-white/15 py-11 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-4">
                  <h3 className="text-[clamp(1.35rem,2.2vw,1.875rem)] text-white">
                    {project.name}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-[14px] text-white/60">{project.location}</span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="text-[14px] text-white/60">{project.type}</span>
                    <span className="border border-white/25 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-white/80 uppercase">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-4 text-[14px] text-white/50">
                    Investeringsperiode · {project.period}
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-5 md:col-span-5">
                  <div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="eyebrow text-white/45">Forventet</span>
                      <span className="tnum text-[14px] text-white/70">
                        {project.expectedLabel}
                      </span>
                    </div>
                    <div className="h-[6px] w-full bg-white/12">
                      <motion.div
                        className="h-full bg-white/45"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.15 }}
                        style={{ width: `${expectedWidth}%`, transformOrigin: 'left' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="eyebrow text-signal">
                        {realized ? 'Realiseret' : 'Under opførelse'}
                      </span>
                      <span className="tnum text-[14px] text-white/70">
                        {project.realizedLabel ?? '—'}
                      </span>
                    </div>
                    <div className="h-[6px] w-full bg-white/12">
                      {realized ? (
                        <motion.div
                          className="h-full bg-signal"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={VIEWPORT}
                          transition={{ duration: 1.45, ease: EASE_EXPO, delay: 0.3 }}
                          style={{ width: `${realizedWidth}%`, transformOrigin: 'left' }}
                        />
                      ) : (
                        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.28)_0_6px,transparent_6px_12px)]" />
                      )}
                    </div>
                  </div>

                  {beat !== null && (
                    <p className="text-[13px] text-signal">
                      {beat.toLocaleString('da-DK', { maximumFractionDigits: 1 })} procentpoint over
                      forventning
                    </p>
                  )}
                </div>

                <div className="flex items-end md:col-span-3 md:justify-end">
                  <div className="md:text-right">
                    <span className="eyebrow text-white/45">
                      {realized ? 'Realiseret afkast' : 'Forventet afkast'}
                    </span>
                    <Counter
                      value={realized ?? project.expected}
                      decimals={(realized ?? project.expected) % 1 !== 0 ? (realized ? 1 : 2) : 0}
                      suffix=" %"
                      className="tnum mt-2 block text-[clamp(2.5rem,5vw,4rem)] leading-none font-semibold tracking-[-0.045em] text-white"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

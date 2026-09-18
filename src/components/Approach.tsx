import { motion } from 'framer-motion';
import { approach } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { MaskedLines } from './ui/MaskedLines';
import { AnalysisGrid } from './AnalysisGrid';

export function Approach() {
  return (
    <section id="tilgang" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <motion.div
          className="mb-14 flex items-center gap-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <span className="eyebrow text-navy/50">{approach.label}</span>
          <span className="h-px flex-1 bg-line" />
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MaskedLines
              as="h2"
              lines={[approach.title]}
              className="text-[clamp(2.25rem,5.4vw,4.75rem)]"
            />

            <motion.p
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-body"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {approach.lead}
            </motion.p>

            <div className="mt-12 flex flex-col">
              {approach.phases.map((phase, i) => (
                <motion.div
                  key={phase.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  className="border-t border-line py-8"
                >
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <span className="tnum text-[13px] font-medium text-muted">{phase.index}</span>
                    <h3 className="text-[clamp(1.4rem,2.4vw,2rem)]">{phase.name}</h3>
                    <span className="ml-auto text-[13px] text-muted">{phase.scope}</span>
                  </div>

                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body sm:pl-10">
                    {phase.body}
                  </p>

                  {phase.steps.length > 0 && (
                    <div className="mt-6 grid gap-5 sm:pl-10 md:grid-cols-2">
                      {phase.steps.map((step) => (
                        <div key={step.index} className="border-l-2 border-navy pl-5">
                          <span className="eyebrow text-navy/50">{step.index}</span>
                          <p className="mt-2 text-[14px] leading-relaxed text-body">{step.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <AnalysisGrid />

              <motion.figure
                className="mt-10 border-l-2 border-navy pl-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                <blockquote className="text-[clamp(1.1rem,1.6vw,1.375rem)] leading-[1.45] font-medium tracking-[-0.02em] text-navy">
                  “{approach.quote.text}”
                </blockquote>
                <figcaption className="mt-5">
                  <span className="block text-[15px] font-medium text-navy">
                    {approach.quote.author}
                  </span>
                  <span className="block text-[13px] text-muted">{approach.quote.role}</span>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

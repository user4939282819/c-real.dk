import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { currentProject } from '../data/content';
import { fadeUp, stagger, VIEWPORT } from '../lib/motion';

export function CurrentProject() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} id="projekter" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <motion.div
          className="mb-14 flex items-center gap-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <span className="eyebrow text-navy/50">{currentProject.label}</span>
          <span className="h-px flex-1 bg-line" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="bg-navy px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase">
                {currentProject.status}
              </span>
              <span className="text-[14px] text-muted">{currentProject.location}</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-6 text-[clamp(1.85rem,3.8vw,3.25rem)]"
            >
              {currentProject.name}
            </motion.h2>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-5 max-w-md text-[16px] leading-relaxed text-body"
            >
              {currentProject.description}
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="relative mt-9 aspect-[4/3] w-full overflow-hidden"
            >
              <motion.img
                src="/brand/afsluttet.jpg"
                alt="C-Real Troldebakkerne II, Helsinge"
                className="absolute inset-0 h-[116%] w-full object-cover"
                style={{ y: imageY }}
              />
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-9 border-l-2 border-navy bg-surface p-6"
            >
              <p className="text-[15px] leading-relaxed text-navy">
                Projektet er fuldtegnet. Bestil materialet for at blive prioriteret ved næste
                kapitalrejsning.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#kontakt"
                  className="group relative overflow-hidden bg-navy px-7 py-3.5 text-[14px] font-medium text-white"
                >
                  <span className="relative z-10">{currentProject.primaryCta}</span>
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-navy-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                </a>
                <a
                  href="#kontakt"
                  className="border border-line-strong bg-paper px-7 py-3.5 text-[14px] font-medium text-navy transition-colors duration-500 hover:border-navy"
                >
                  {currentProject.secondaryCta}
                </a>
              </div>
            </motion.div>
          </div>

          <motion.dl
            className="grid grid-cols-2 gap-px self-start border border-line bg-line lg:col-span-7 lg:grid-cols-3"
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {currentProject.facts.map((fact) => {
              const highlight = 'highlight' in fact && fact.highlight;
              return (
                <motion.div
                  key={fact.label}
                  variants={fadeUp}
                  className={[
                    'flex min-h-[140px] flex-col justify-between p-6 transition-colors duration-500 md:p-7',
                    highlight ? 'bg-navy' : 'bg-paper hover:bg-surface',
                  ].join(' ')}
                >
                  <dt
                    className={['eyebrow', highlight ? 'text-white/55' : 'text-navy/45'].join(' ')}
                  >
                    {fact.label}
                  </dt>
                  <dd
                    className={[
                      'tnum mt-6 leading-none font-semibold tracking-[-0.035em]',
                      highlight
                        ? 'text-[clamp(1.85rem,3vw,2.5rem)] text-white'
                        : 'text-[clamp(1.15rem,1.9vw,1.6rem)] text-navy',
                    ].join(' ')}
                  >
                    {fact.value}
                  </dd>
                </motion.div>
              );
            })}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

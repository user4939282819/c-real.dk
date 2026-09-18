import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { investmentTypes } from '../data/content';
import { EASE_EXPO, fadeUp, stagger, VIEWPORT } from '../lib/motion';

export function InvestmentTypes() {
  const [active, setActive] = useState<string | null>(investmentTypes[0].id);

  return (
    <section id="investeringstyper" className="border-t border-line bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <motion.div
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div>
            <span className="eyebrow text-navy/50">Investeringstyper</span>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2rem,4.4vw,3.75rem)]">
              Fire faser, én strategi
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-body">
            Hver investeringstype dækker et afgrænset stadie i ejendomsudviklingen — med sin egen
            horisont og afkastprofil.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {investmentTypes.map((type) => {
            const isOpen = active === type.id;

            return (
              <motion.div key={type.id} variants={fadeUp} className="flex flex-col bg-paper">
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : type.id)}
                  aria-expanded={isOpen}
                  className="group flex flex-1 flex-col items-start p-7 text-left transition-colors duration-500 hover:bg-surface md:p-8"
                >
                  <div className="flex w-full items-start justify-between">
                    <img
                      src={type.icon}
                      alt=""
                      className="h-14 w-14 object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
                    />
                    <span className="tnum text-[13px] font-medium text-muted">{type.index}</span>
                  </div>

                  <h3 className="mt-7 text-[clamp(1.35rem,2vw,1.75rem)]">{type.name}</h3>

                  <div className="mt-5 flex w-full items-baseline justify-between border-t border-line pt-5">
                    <span className="text-[13px] text-muted">{type.horizon}</span>
                    <span className="tnum text-2xl font-semibold tracking-[-0.03em] text-navy">
                      {type.yieldLabel}
                    </span>
                  </div>

                  <span className="mt-5 flex items-center gap-2 text-[13px] font-medium text-navy">
                    {isOpen ? 'Skjul detaljer' : 'Se detaljer'}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                      className="inline-flex"
                      aria-hidden
                    >
                      <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE_EXPO }}
                      className="overflow-hidden bg-surface"
                    >
                      <div className="flex flex-col gap-5 border-t border-line p-7 md:p-8">
                        <p className="text-[14px] leading-relaxed text-navy">{type.definition}</p>

                        <div>
                          <span className="eyebrow text-navy/45">{type.workLabel}</span>
                          <p className="mt-2 text-[14px] leading-relaxed text-body">{type.work}</p>
                        </div>

                        <div>
                          <span className="eyebrow text-navy/45">{type.returnLabel}</span>
                          <p className="mt-2 text-[14px] leading-relaxed text-body">
                            {type.returnBody}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

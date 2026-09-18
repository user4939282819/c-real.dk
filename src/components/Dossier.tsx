import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dossier } from '../data/content';
import { EASE_EXPO, fadeUp, VIEWPORT } from '../lib/motion';

/**
 * The order-material page from the live site, reproduced as a section:
 * project description, the "Om Fonden" fact sheet, and the real request
 * form (name, email, phone, postal code, consent, KID download).
 */
export function Dossier() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="udbud" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <div className="overflow-hidden rounded-card bg-white">
        {/* The brochure composite is its own artwork (three pages, ~3:2), so it's shown whole rather than cropped to a wide banner. */}
        <div className="relative aspect-[3/2] md:aspect-[2/1]">
          <img src={dossier.photo} alt={`${dossier.name}, ${dossier.status}`} className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>

        <div className="grid gap-10 p-6 md:grid-cols-2 md:gap-16 md:p-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.75rem)] text-navy">{dossier.name}</h2>
            {dossier.intro.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-relaxed text-body">
                {p}
              </p>
            ))}

            <p className="mt-8 text-[16px] font-bold text-navy">{dossier.label}</p>
            <dl className="mt-4 divide-y divide-line border-t border-line">
              {dossier.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-[14px] text-body">{f.label}</dt>
                  <dd className={['text-right text-[15px] font-semibold tnum', 'positive' in f && f.positive ? 'text-positive' : 'text-navy'].join(' ')}>{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[12px] text-muted">{dossier.note}</p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-[13px] font-semibold text-navy">{dossier.kidLabel}</p>
              <a href="#" className="mt-2 inline-flex items-center gap-2 text-[14px] text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">
                {dossier.kidLink}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 2v9M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} custom={1}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_EXPO }}
                  className="flex min-h-[420px] items-center rounded-card bg-card p-8"
                >
                  <p className="text-[clamp(1.25rem,2vw,1.6rem)] font-bold tracking-[-0.02em] text-navy">{dossier.success}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} className="rounded-card bg-card p-6 md:p-8">
                  <p className="text-[18px] font-bold text-navy">{dossier.formTitle}</p>
                  <div className="mt-6 flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label={dossier.fields.name} name="name" required />
                      <Field label={dossier.fields.email} name="email" type="email" required />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label={dossier.fields.phone} name="phone" type="tel" />
                      <Field label={dossier.fields.postal} name="postal" />
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 accent-navy"
                      />
                      <span className="text-[12px] leading-relaxed text-body">{dossier.consent}</span>
                    </label>

                    <button
                      type="submit"
                      disabled={!consent}
                      className="group relative mt-2 w-full overflow-hidden rounded-full bg-navy py-4 text-[15px] font-semibold text-white transition-opacity disabled:opacity-40"
                    >
                      <span aria-hidden className="absolute -inset-px translate-y-[102%] rounded-full bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-enabled:group-hover:translate-y-0" />
                      <span className="relative transition-colors duration-700 group-enabled:group-hover:text-navy">{dossier.submit}</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-medium text-body">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-navy/30 bg-transparent py-2.5 text-[15px] text-navy focus:border-navy focus:outline-none"
      />
    </label>
  );
}

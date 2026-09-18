import { useId, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact, investorContact } from '../data/content';
import { EASE_EXPO, fadeUp, stagger, VIEWPORT } from '../lib/motion';

function Field({
  label,
  type = 'text',
  name,
  required,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-navy">
        {label}
        {required && <span className="ml-1 text-muted">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full border border-line bg-paper px-4 py-3.5 text-[15px] text-navy transition-colors duration-300 focus:border-navy focus:outline-none"
      />
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const interestId = useId();
  const messageId = useId();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="kontakt" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.span
              className="eyebrow text-navy/50"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {contact.label}
            </motion.span>

            <motion.h2
              className="mt-5 text-[clamp(2rem,4.6vw,4rem)]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {contact.title}
            </motion.h2>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-6 max-w-md text-[16px] leading-relaxed text-body"
            >
              {contact.body}
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-10 border border-line bg-surface p-6"
            >
              <span className="eyebrow text-navy/45">Investorkontakt</span>
              <p className="mt-4 text-[19px] font-semibold tracking-[-0.02em] text-navy">
                {investorContact.name}
              </p>
              <p className="mt-1 text-[13px] text-muted">{investorContact.role}</p>
              <div className="mt-5 flex flex-col gap-1.5 text-[15px] text-navy">
                <a href={`mailto:${investorContact.email}`} className="hover:underline">
                  {investorContact.email}
                </a>
                <a
                  href={`tel:${investorContact.phone.replace(/\s/g, '')}`}
                  className="hover:underline"
                >
                  {investorContact.phone}
                </a>
              </div>
            </motion.div>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-7 max-w-md text-[13px] leading-relaxed text-muted"
            >
              {contact.disclaimer}
            </motion.p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_EXPO }}
                  className="flex min-h-[380px] flex-col items-start justify-center border border-line bg-surface p-10"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy">
                    <svg width="20" height="15" viewBox="0 0 20 15" fill="none" aria-hidden>
                      <path d="M1 8l6 6L19 1" stroke="#fff" strokeWidth="2" />
                    </svg>
                  </span>
                  <p className="mt-7 max-w-sm text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-semibold tracking-[-0.03em] text-navy">
                    {contact.success}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <motion.div variants={fadeUp} className="grid gap-6 sm:grid-cols-2">
                    <Field label={contact.fields.name} name="name" required />
                    <Field label={contact.fields.email} name="email" type="email" required />
                  </motion.div>

                  <motion.div variants={fadeUp} className="grid gap-6 sm:grid-cols-2">
                    <Field label={contact.fields.phone} name="phone" type="tel" />

                    <div>
                      <label
                        htmlFor={interestId}
                        className="mb-2 block text-[13px] font-medium text-navy"
                      >
                        {contact.fields.interest}
                      </label>
                      <select
                        id={interestId}
                        name="interest"
                        defaultValue=""
                        className="w-full appearance-none border border-line bg-paper px-4 py-3.5 text-[15px] text-navy transition-colors duration-300 focus:border-navy focus:outline-none"
                      >
                        <option value="" disabled>
                          Vælg
                        </option>
                        {contact.interestOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor={messageId}
                      className="mb-2 block text-[13px] font-medium text-navy"
                    >
                      {contact.fields.message}
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={5}
                      className="w-full resize-none border border-line bg-paper px-4 py-3.5 text-[15px] text-navy transition-colors duration-300 focus:border-navy focus:outline-none"
                    />
                  </motion.div>

                  <motion.button
                    variants={fadeUp}
                    type="submit"
                    className="group relative w-full overflow-hidden bg-navy px-9 py-4.5 text-[15px] font-medium text-white sm:w-auto sm:self-start"
                  >
                    <span className="relative z-10">{contact.submit}</span>
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-navy-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

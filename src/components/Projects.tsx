import { motion } from 'framer-motion';
import { projects } from '../data/content';
import { fadeUp, stagger, VIEWPORT } from '../lib/motion';
import { Button } from './ui/Button';
import { Counter } from './ui/Counter';

/** Compact, animated cards. With only two projects a horizontal carousel undersold them; a staggered grid gives each one real presence. */
export function Projects() {
  return (
    <section id="projekter" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">{projects.title}</h2>
        <p className="section-sub">{projects.sub}</p>
      </motion.div>

      <motion.div className="mt-10 grid gap-6 sm:grid-cols-2" variants={stagger(0.15)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        {projects.items.map((p, i) => (
          <motion.article
            key={p.name}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group overflow-hidden rounded-card bg-white shadow-[0_20px_50px_-30px_rgba(20,29,61,0.35)]"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                src={p.photo}
                alt={`${p.name}, ${p.status}`}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex flex-col p-6">
              <h3 className="min-h-[2.1em] text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.15]">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <Counter value={p.headline.value} decimals={p.headline.decimals} suffix=" %" className="figure text-[clamp(1.7rem,2.2vw,2.1rem)] leading-none text-positive" />
                <span className="text-[13px] text-body">{p.headline.label}</span>
              </div>

              <dl className="mt-5 divide-y divide-line border-t border-line">
                {p.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[13px] text-body">{f.label}</dt>
                    <dd className={['tnum text-right text-[13px] font-semibold', 'positive' in f && f.positive ? 'text-positive' : 'text-navy'].join(' ')}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 flex flex-col items-start gap-6"
        variants={fadeUp}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <p className="text-[13px] text-muted">{projects.note}</p>
        <Button href="#udbud">{projects.more}</Button>
      </motion.div>
    </section>
  );
}

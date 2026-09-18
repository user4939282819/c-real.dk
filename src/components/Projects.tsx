import { motion } from 'framer-motion';
import { projects } from '../data/content';
import { fadeUp, stagger, VIEWPORT } from '../lib/motion';
import { Button } from './ui/Button';
import { Counter } from './ui/Counter';

export function Projects() {
  return (
    <section id="projekter" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">{projects.title}</h2>
        <p className="section-sub">{projects.sub}</p>
      </motion.div>

      <motion.div className="mt-10 grid gap-6 lg:grid-cols-2" variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        {projects.items.map((p) => (
          <motion.article key={p.name} variants={fadeUp} className="group flex flex-col overflow-hidden rounded-card bg-white">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={p.photo}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute top-5 left-5 rounded-full bg-navy px-4 py-2 text-[12px] font-semibold text-white">{p.status}</span>
            </div>

            <div className="flex flex-1 flex-col p-7 md:p-9">
              {/* Fixed rows so both cards place title and figure identically. */}
              <h3 className="min-h-[2.3em] text-[clamp(1.4rem,1.9vw,1.75rem)] leading-[1.15]">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-3">
                <Counter value={p.headline.value} decimals={p.headline.decimals} suffix=" %" className="figure text-[clamp(2.4rem,3.6vw,3.4rem)] leading-none text-positive" />
                <span className="text-[14px] text-body">{p.headline.label}</span>
              </div>

              <dl className="mt-8 divide-y divide-line border-t border-line">
                {p.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="text-[14px] text-body">{f.label}</dt>
                    <dd className={['tnum text-right text-[15px] font-semibold', 'positive' in f && f.positive ? 'text-positive' : 'text-navy'].join(' ')}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-8 flex flex-col items-start gap-6">
        <p className="text-[13px] text-muted">{projects.note}</p>
        <Button href="#kontakt">{projects.more}</Button>
      </div>
    </section>
  );
}

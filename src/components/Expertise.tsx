import { motion } from 'framer-motion';
import { expertise } from '../data/content';
import { fadeUp, stagger, VIEWPORT } from '../lib/motion';

export function Expertise() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">{expertise.title}</h2>
        <p className="section-sub">{expertise.sub}</p>
      </motion.div>

      <motion.div className="mt-10 grid gap-4 md:grid-cols-2" variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        {expertise.cards.map((c) => (
          <motion.a
            key={c.title}
            href="#investeringstyper"
            variants={fadeUp}
            className="group relative block aspect-[13/12] overflow-hidden rounded-card md:aspect-[13/11]"
          >
            <img
              src={c.photo}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-9">
              <h3 className="text-[clamp(1.7rem,2.6vw,2.25rem)] text-white">{c.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-snug text-white/85">{c.text}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

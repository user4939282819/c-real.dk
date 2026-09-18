import { motion } from 'framer-motion';
import { salesTeam } from '../data/content';
import { fadeUp, stagger, VIEWPORT } from '../lib/motion';
import { Button } from './ui/Button';

/** Faces first: the people investors actually reach, with one tap to call or write. */
export function Contact() {
  return (
    <section id="kontakt" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">{salesTeam.title}</h2>
        <p className="section-sub">{salesTeam.sub}</p>
      </motion.div>

      <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        {salesTeam.people.map((p) => {
          const tel = `tel:${p.phone.replace(/\s/g, '')}`;
          return (
            <motion.article
              key={p.email}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col overflow-hidden rounded-card bg-navy text-white shadow-[0_24px_60px_-30px_rgba(20,29,61,0.45)] will-change-transform"
            >
              <div className="relative aspect-[4/4.2] overflow-hidden">
                <img src={p.photo} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-[center_18%]" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="min-h-[2.3em] text-[clamp(1.35rem,1.8vw,1.6rem)] leading-[1.15] text-white">{p.name}</h3>
                <p className="mt-1 text-[14px] text-white/70">{p.role}</p>
                <div className="mt-6 flex flex-col gap-1.5 text-[15px]">
                  <a href={tel} className="font-semibold text-white hover:underline">
                    {p.phone}
                  </a>
                  <a href={`mailto:${p.email}`} className="text-white/85 hover:text-white hover:underline">
                    {p.email}
                  </a>
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <Button href={tel} variant="light">
                    {salesTeam.call} {p.name.split(' ')[0]}
                  </Button>
                  <Button href={`mailto:${p.email}`} variant="glass">
                    {salesTeam.write}
                  </Button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

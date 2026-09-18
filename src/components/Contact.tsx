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

      <motion.div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5" variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        {salesTeam.people.map((p) => {
          const tel = `tel:${p.phone.replace(/\s/g, '')}`;
          return (
            <motion.article
              key={p.email}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col overflow-hidden rounded-card bg-navy text-white shadow-[0_16px_40px_-24px_rgba(20,29,61,0.45)] will-change-transform"
            >
              <div className="relative aspect-[4/3.4] overflow-hidden">
                <img src={p.photo} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-[center_18%]" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="min-h-[2.1em] text-[clamp(0.95rem,1.3vw,1.1rem)] leading-[1.2] text-white">{p.name}</h3>
                <p className="mt-0.5 text-[12px] text-white/70">{p.role}</p>
                <div className="mt-3 flex flex-col gap-1 text-[12px]">
                  <a href={tel} className="font-semibold text-white hover:underline">
                    {p.phone}
                  </a>
                  <a href={`mailto:${p.email}`} className="truncate text-white/85 hover:text-white hover:underline">
                    {p.email}
                  </a>
                </div>
                <div className="mt-auto pt-4">
                  <Button href={tel} variant="light" size="sm" className="w-full justify-center">
                    {salesTeam.call} {p.name.split(' ')[0]}
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

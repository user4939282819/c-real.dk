import { motion } from 'framer-motion';
import { about, photos } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';

export function About() {
  return (
    <section id="om" className="mx-auto max-w-[1440px] px-4 py-16 md:px-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr_1fr] md:gap-12">
        <motion.div className="aspect-[3/4] overflow-hidden rounded-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <img src={photos.aboutLeft} alt="Moderne boligbyggeri i Ørestad" className="h-full w-full object-cover object-[45%_50%]" />
        </motion.div>

        <motion.div className="md:px-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} custom={1}>
          <h2 className="section-title text-[clamp(2rem,3.2vw,2.9rem)]">
            {about.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="section-sub font-medium text-navy">{about.text}</p>
          {about.body.map((p) => (
            <p key={p} className="mt-5 max-w-[36rem] text-[15px] leading-relaxed text-body">
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div className="aspect-[3/4] overflow-hidden rounded-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} custom={2}>
          <img src={photos.aboutRight} alt="Moderne boligfacade i København" className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

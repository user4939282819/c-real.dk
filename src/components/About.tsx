import { motion } from 'framer-motion';
import { about, photos } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';

export function About() {
  return (
    <section id="om" className="mx-auto max-w-[1440px] px-4 py-16 md:px-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr_1fr] md:gap-12">
        {/*
          Landscape on a phone, portrait from md up.
          These two sit in narrow side columns on desktop, where a 3:4 crop
          reads as a detail. On a phone the same box becomes full width and
          tall, and since aboutLeft is a landscape frame (1600x1054) the crop
          threw away the building entirely and left a slab of grass and
          footpath, which looked like the image had failed to load. Matching
          the ratio to the source on small screens keeps the subject in frame.
        */}
        <motion.div className="aspect-[4/3] overflow-hidden rounded-card md:aspect-[3/4]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <img src={photos.aboutLeft} alt="Moderne boligbyggeri i Ørestad" className="h-full w-full object-cover object-center md:object-[45%_50%]" loading="lazy" decoding="async" />
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

        {/* aboutRight is a portrait frame (1600x2400), so 3:4 suits it at every width. */}
        <motion.div className="aspect-[3/4] overflow-hidden rounded-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} custom={2}>
          <img src={photos.aboutRight} alt="Moderne boligfacade i København" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </motion.div>
      </div>
    </section>
  );
}

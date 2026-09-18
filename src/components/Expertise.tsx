import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { expertise } from '../data/content';
import { fadeUp, stagger, VIEWPORT } from '../lib/motion';

function CardMedia({ photo, video, title }: { photo?: string; video?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView]);

  if (video) {
    return (
      <video
        ref={ref}
        src={video}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    );
  }
  return (
    <img
      src={photo}
      alt={title}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      loading="lazy"
      decoding="async"
    />
  );
}

export function Expertise() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        <h2 className="section-title">{expertise.title}</h2>
        <p className="section-sub">{expertise.sub}</p>
      </motion.div>

      <motion.div className="mt-10 grid gap-4 md:grid-cols-2" variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        {expertise.cards.map((c) => (
          <motion.a key={c.title} href="#investeringstyper" variants={fadeUp} className="group relative block aspect-[13/12] overflow-hidden rounded-card md:aspect-[13/11]">
            <CardMedia photo={c.photo} video={c.video} title={c.title} />
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

import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { photos } from '../data/content';
import { useSlowVideo } from '../lib/useSlowVideo';

function Frame({ src, alt, className, offset }: { src: string; alt: string; className: string; offset: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={`overflow-hidden rounded-card ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
    </motion.div>
  );
}

/** Same drifting frame, but a looping aerial film instead of a still photo. */
function VideoFrame({ src, className, offset }: { src: string; className: string; offset: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  useSlowVideo(videoRef);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView]);

  return (
    <motion.div ref={ref} style={{ y }} className={`overflow-hidden rounded-card ${className}`}>
      <video ref={videoRef} src={src} className="h-full w-full object-cover" muted loop playsInline preload="metadata" aria-hidden />
    </motion.div>
  );
}

/** Three frames that drift at different speeds; the centre one is a real aerial film of Copenhagen. */
export function Collage() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pt-14 md:px-16 md:pt-20">
      <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-[1fr_2.6fr_1fr] md:gap-16">
        <Frame src={photos.spire} alt="Vor Frelsers Kirke set fra luften" className="aspect-[3/4]" offset={40} />
        <VideoFrame src="/video/cph-city.mp4" className="order-first col-span-2 aspect-[16/9] md:order-none md:col-span-1" offset={-20} />
        <Frame src={photos.dome} alt="Marmorkirken ved solnedgang" className="aspect-[3/4]" offset={40} />
      </div>
    </section>
  );
}

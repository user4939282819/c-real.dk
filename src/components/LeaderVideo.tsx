import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leaderVideo, leadership } from '../data/content';
import { EASE_EXPO, fadeUp, VIEWPORT } from '../lib/motion';

export function LeaderVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="border-t border-line bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <motion.div
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div>
            <span className="eyebrow text-navy/50">{leaderVideo.label}</span>
            <h2 className="mt-5 max-w-[20ch] text-[clamp(1.85rem,4vw,3.25rem)]">
              {leaderVideo.title}
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-body">{leaderVideo.body}</p>
        </motion.div>

        <motion.div
          className="relative aspect-video w-full overflow-hidden bg-navy"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <video
            ref={videoRef}
            src={leaderVideo.src}
            poster={leaderVideo.poster}
            className="h-full w-full object-cover"
            playsInline
            preload="metadata"
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          <AnimatePresence>
            {!playing && (
              <motion.button
                type="button"
                onClick={toggle}
                aria-label="Afspil video"
                className="absolute inset-0 flex flex-col items-center justify-center bg-navy/45"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_EXPO }}
                data-cursor
              >
                <motion.span
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white md:h-24 md:w-24"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                >
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
                    <path d="M19 11 0 22V0l19 11Z" fill="var(--color-navy)" />
                  </svg>
                </motion.span>

                <span className="absolute right-0 bottom-0 left-0 flex flex-wrap items-end justify-between gap-3 p-6 text-left md:p-8">
                  <span>
                    <span className="block text-[clamp(1.1rem,1.8vw,1.5rem)] font-semibold tracking-[-0.03em] text-white">
                      {leaderVideo.name}
                    </span>
                    <span className="block text-[13px] text-white/70">{leaderVideo.role}</span>
                  </span>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.ul
          className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {leadership.map((person) => (
            <li
              key={person.email}
              className="bg-paper p-6 transition-colors duration-500 hover:bg-surface"
            >
              <p className="text-[17px] font-semibold tracking-[-0.02em] text-navy">
                {person.name}
              </p>
              <p className="mt-1 text-[13px] text-muted">{person.role}</p>
              <a
                href={`mailto:${person.email}`}
                className="mt-4 inline-block text-[14px] text-navy underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-navy"
              >
                {person.email}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

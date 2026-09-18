import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { investorContact } from '../data/content';
import { EASE_EXPO } from '../lib/motion';

/**
 * Persistent floating contact bubble, bottom right. Shows the investor
 * contact's face at rest; opens into a small card with his name, role and
 * one-tap call/email. Appears once the hero has scrolled past so it never
 * competes with the hero's own CTAs.
 */
export function ConsultantBubble({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ready]);

  const tel = `tel:${investorContact.phone.replace(/\s/g, '')}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed right-5 bottom-5 z-[80] md:right-8 md:bottom-8"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 12 }}
                transition={{ duration: 0.35, ease: EASE_EXPO }}
                className="flex w-[280px] flex-col overflow-hidden rounded-card bg-navy text-white shadow-[0_24px_60px_-16px_rgba(20,29,61,0.5)]"
              >
                <div className="flex items-start justify-between gap-3 p-5 pb-0">
                  <div className="flex items-center gap-3">
                    <img src={investorContact.photo} alt={investorContact.name} className="h-12 w-12 rounded-full object-cover object-[center_20%]" />
                    <div>
                      <p className="text-[15px] font-bold leading-tight">{investorContact.name}</p>
                      <p className="text-[12px] text-white/60">{investorContact.role}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Luk"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <p className="px-5 pt-3 text-[13px] leading-relaxed text-white/75">{investorContact.intro}</p>
                <div className="mt-4 flex flex-col gap-2 p-5 pt-0">
                  <a href={tel} className="flex items-center justify-center gap-2 rounded-full bg-white py-3 text-[14px] font-semibold text-navy transition-transform hover:-translate-y-0.5">
                    {investorContact.cta}
                  </a>
                  <a
                    href={`mailto:${investorContact.email}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/30 py-3 text-[13px] font-medium text-white/85 transition-colors hover:border-white/60 hover:text-white"
                  >
                    {investorContact.email}
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="bubble"
                type="button"
                onClick={() => setOpen(true)}
                aria-label={investorContact.bubbleLabel}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
                className="group flex items-center gap-3 rounded-full bg-navy py-2 pr-5 pl-2 text-white shadow-[0_16px_40px_-12px_rgba(20,29,61,0.55)] transition-transform hover:-translate-y-0.5"
              >
                <span className="relative h-11 w-11 shrink-0">
                  <img src={investorContact.photo} alt="" className="h-11 w-11 rounded-full object-cover object-[center_20%] ring-2 ring-white/20" />
                  <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-navy bg-positive-soft" />
                </span>
                <span className="hidden text-[13px] font-semibold sm:block">{investorContact.bubbleCollapsed}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

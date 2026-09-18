import { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { nav } from '../data/content';
import { EASE_EXPO } from '../lib/motion';
import { Logo } from './ui/Logo';
import { Button } from './ui/Button';

/** One floating, centred pill. It tightens slightly once the page scrolls. */
export function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 z-50 flex items-center gap-2 rounded-full border border-white/70 bg-white/85 py-2 pr-2 pl-3 shadow-[0_12px_44px_-14px_rgba(20,29,61,0.28)] backdrop-blur-xl md:gap-6 md:pl-5"
        initial={{ y: -60, x: '-50%', opacity: 0 }}
        animate={ready ? { y: 0, x: '-50%', opacity: 1, scale: scrolled ? 0.96 : 1 } : {}}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE_EXPO }}
      >
        <a href="#top" aria-label="C-Real forside" className="flex items-center">
          <Logo className="h-8 w-auto text-navy" />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {nav.left.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="group relative text-[14px] font-medium text-navy">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-navy transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href={nav.cta.href} size="sm">
            {nav.cta.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-navy lg:hidden"
        >
          <motion.span
            className="block h-[1.5px] w-5 rounded-full bg-white"
            animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
          />
          <motion.span
            className="block h-[1.5px] w-5 rounded-full bg-white"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2, ease: EASE_EXPO }}
          />
          <motion.span
            className="block h-[1.5px] w-5 rounded-full bg-white"
            animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
          />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-navy px-8 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <ul className="flex flex-col gap-4">
              {[...nav.left, nav.cta].map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl font-bold tracking-[-0.03em] text-white"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: EASE_EXPO }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

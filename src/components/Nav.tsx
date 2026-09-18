import { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { nav } from '../data/content';
import { EASE_EXPO } from '../lib/motion';
import { Logo } from './ui/Logo';

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 40));

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_EXPO }}
      >
        <motion.div
          className="absolute inset-0 border-b backdrop-blur-xl"
          animate={{
            backgroundColor: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0)',
            borderColor: scrolled ? 'rgba(228,231,236,1)' : 'rgba(228,231,236,0)',
          }}
          transition={{ duration: 0.45, ease: EASE_EXPO }}
        />

        <nav className="relative mx-auto flex max-w-[1560px] items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" aria-label="C-Real forside">
            <Logo className="h-9 w-auto text-navy md:h-10" />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-[14px] font-medium text-navy/75 transition-colors hover:text-navy"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-navy transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              className="group relative hidden overflow-hidden bg-navy px-6 py-3 text-[13px] font-medium text-white md:inline-block"
            >
              <span className="relative z-10">Bestil materiale</span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-navy-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
            </a>

            <button
              type="button"
              aria-label={open ? 'Luk menu' : 'Åbn menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <motion.span
                className="block h-[1.5px] w-6 bg-navy"
                animate={{ rotate: open ? 45 : 0, y: open ? 3.25 : 0 }}
                transition={{ duration: 0.4, ease: EASE_EXPO }}
              />
              <motion.span
                className="block h-[1.5px] w-6 bg-navy"
                animate={{ rotate: open ? -45 : 0, y: open ? -3.25 : 0 }}
                transition={{ duration: 0.4, ease: EASE_EXPO }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-navy px-6 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.75, ease: EASE_EXPO }}
          >
            <ul className="flex flex-col gap-3">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl font-semibold tracking-[-0.03em] text-white"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.85, delay: 0.08 + i * 0.055, ease: EASE_EXPO }}
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

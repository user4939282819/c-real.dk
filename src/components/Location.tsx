import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { company, location } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { useReducedEffects } from '../lib/useReducedEffects';
import { Button } from './ui/Button';

const q = encodeURIComponent(location.query);
const GOOGLE_EMBED = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
const GOOGLE_LINK = `https://www.google.com/maps/search/?api=1&query=${q}`;

/**
 * Copies the office address, with the label swapping to a confirmation and
 * back. It replaces the Apple Maps link that used to sit here: that one
 * handed the browser a maps: handoff URL, which on desktop resolves to
 * nothing useful and took the tab with it. This never navigates at all, so
 * there is nothing for it to break, and it is the more useful action next to
 * a map that is already on screen.
 */
function CopyAddress() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onCopy = useCallback(async () => {
    const text = location.addressLines.join(', ');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API needs a secure context; fall back to a throwaway node.
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }, []);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-live="polite"
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/40 bg-white/15 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-md"
    >
      <span
        aria-hidden
        className="absolute -inset-px translate-y-[102%] rounded-full bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      />
      <span className="relative transition-colors duration-700 group-hover:text-navy">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'done' : 'idle'}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            {copied ? location.copied : location.copy}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden className="relative transition-colors duration-700 group-hover:text-navy">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {copied ? <path d="m3.5 8.5 3 3 6-6.5" /> : <><rect x="5.5" y="5.5" width="8" height="8" rx="1.8" /><path d="M10.5 3.5h-7a1 1 0 0 0-1 1v7" /></>}
        </svg>
      </span>
    </button>
  );
}

/**
 * Whether to mount the live Google embed.
 *
 * Measured on a throttled Pixel 7, this iframe was the sole cause of every
 * dropped frame in the bottom third of the page: blocking google.com took
 * that stretch from six long frames and a 167ms stall to none and 33ms.
 * Neither deferring the mount to the viewport nor warming it on idle helped,
 * because the cost is the embed rendering tiles once it is on screen, not
 * when it is asked to load.
 *
 * So phones get a facade instead: an on-brand card that costs nothing and
 * mounts the real map on tap. Desktop, which has the headroom, keeps the
 * live map and simply warms it during an idle moment after first paint. The
 * facade has a second benefit worth keeping: nothing is requested from
 * Google at all until the visitor asks for it.
 */
function useMapMount() {
  const facade = useReducedEffects();
  const [asked, setAsked] = useState(false);
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    if (facade) return;
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setWarm(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setWarm(true), 2500);
    return () => clearTimeout(t);
  }, [facade]);

  return { showMap: facade ? asked : warm, showFacade: facade && !asked, openMap: () => setAsked(true) };
}

/**
 * Office location: a navy-toned map in a card, with the address beside it,
 * one tap to open the route in Google Maps, and one to copy the address.
 */
export function Location() {
  const { showMap, showFacade, openMap } = useMapMount();

  return (
    <section id="find-os" className="mx-auto max-w-[1440px] px-4 py-14 md:px-16 md:py-20">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr]">
        <motion.div
          className="flex flex-col justify-between rounded-card bg-navy p-8 text-white md:p-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div>
            <h2 className="section-title text-white">{location.title}</h2>
            <p className="section-sub text-white/75">{location.sub}</p>
            <address className="mt-8 text-[17px] leading-relaxed not-italic">
              {location.addressLines.map((l) => (
                <span key={l} className="block font-medium">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-4 text-[14px] text-white/60">
              CVR {company.cvr} · FTID {company.ftid}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={GOOGLE_LINK} variant="light" external>
              {location.google}
            </Button>
            <CopyAddress />
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-card bg-card [isolation:isolate] lg:aspect-auto lg:min-h-[460px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          custom={1}
        >
          {showMap && (
            <iframe
              title="Kort over Bredgade 45B, København"
              src={GOOGLE_EMBED}
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}

          {showFacade && (
            <button
              type="button"
              onClick={openMap}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card text-navy"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 21s6-6.2 6-11a6 6 0 1 0-12 0c0 4.8 6 11 6 11Z" />
                  <circle cx="12" cy="10" r="2.2" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold">{location.showMap}</span>
            </button>
          )}
          <div className="pointer-events-none absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-navy shadow-[0_10px_30px_-12px_rgba(20,29,61,0.4)]">
            <span className="h-2 w-2 rounded-full bg-positive" />
            Bredgade 45B
          </div>
        </motion.div>
      </div>
    </section>
  );
}

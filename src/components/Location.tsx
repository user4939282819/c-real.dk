import { motion } from 'framer-motion';
import { company, location } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { Button } from './ui/Button';

const q = encodeURIComponent(location.query);
const GOOGLE_EMBED = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
const GOOGLE_LINK = `https://www.google.com/maps/search/?api=1&query=${q}`;
const APPLE_LINK = `https://maps.apple.com/?q=${q}`;

/**
 * Office location: a navy-toned map in a card, with the address beside it
 * and one tap to open the route in Google Maps or Apple Maps.
 */
export function Location() {
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
            <Button href={GOOGLE_LINK} variant="light">
              {location.google}
            </Button>
            <Button href={APPLE_LINK} variant="glass">
              {location.apple}
            </Button>
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
          <iframe
            title="Kort over Bredgade 45B, København"
            src={GOOGLE_EMBED}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-navy shadow-[0_10px_30px_-12px_rgba(20,29,61,0.4)]">
            <span className="h-2 w-2 rounded-full bg-positive" />
            Bredgade 45B
          </div>
        </motion.div>
      </div>
    </section>
  );
}

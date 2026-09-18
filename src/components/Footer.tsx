import { motion } from 'framer-motion';
import { company, footer, nav } from '../data/content';
import { fadeUp, VIEWPORT } from '../lib/motion';
import { Logo } from './ui/Logo';

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-[1560px] px-6 pt-20 pb-10 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
              <Logo className="h-14 w-auto text-white" />
            </motion.div>
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-7 max-w-xs text-[14px] leading-relaxed text-white/60"
            >
              {company.regulator}
            </motion.p>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow text-white/45">Sektioner</span>
            <ul className="mt-5 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[15px] text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="eyebrow text-white/45">Selskab</span>
            <address className="mt-5 flex flex-col gap-2 text-[15px] text-white/75 not-italic">
              <span>{company.legalName}</span>
              <span>{company.address}</span>
              <span className="tnum text-white/55">
                CVR {company.cvr} · FTID {company.ftid}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-[12px] leading-relaxed text-white/45">{footer.riskNote}</p>

          <div className="flex flex-wrap items-center gap-6">
            {footer.links.map((link) => (
              <a
                key={link}
                href="#top"
                className="text-[13px] text-white/60 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
            <span className="text-[13px] text-white/45">{footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

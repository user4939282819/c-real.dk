import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-navy" style={{ scaleX }} />;
}

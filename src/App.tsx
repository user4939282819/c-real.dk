import { useCallback, useEffect, useState } from 'react';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { skipLink } from './data/content';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SectionReveal } from './components/ui/SectionReveal';
import { ConsultantBubble } from './components/ConsultantBubble';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { VideoFeature } from './components/VideoFeature';
import { Collage } from './components/Collage';
import { About } from './components/About';
import { Ticker } from './components/Ticker';
import { TrackRecordStats } from './components/TrackRecordStats';
import { Projects } from './components/Projects';
import { Dossier } from './components/Dossier';
import { InvestmentTypes } from './components/InvestmentTypes';
import { Expertise } from './components/Expertise';
import { Process } from './components/Process';
import { Team } from './components/Team';
import { Banner } from './components/Banner';
import { Contact } from './components/Contact';
import { Location } from './components/Location';
import { Footer } from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  useSmoothScroll(ready);

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ready]);

  const onPreloaderDone = useCallback(() => setReady(true), []);

  return (
    <>
      <a
        href={skipLink.target}
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white transition-transform duration-300 focus:translate-y-0"
      >
        {skipLink.label}
      </a>
      <Preloader onDone={onPreloaderDone} />
      <Cursor />
      <ScrollProgress />
      <ConsultantBubble ready={ready} />
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <VideoFeature />
        <Collage />
        <SectionReveal direction="up">
          <About />
        </SectionReveal>
        <Ticker />
        <TrackRecordStats />
        <SectionReveal direction="left">
          <Projects />
        </SectionReveal>
        {/* Not wrapped: its scene column is lg:sticky, and a transformed or
            clipped ancestor changes how sticky resolves. It animates its own
            rows internally instead. */}
        <InvestmentTypes />
        <SectionReveal direction="right">
          <Expertise />
        </SectionReveal>
        {/* Not wrapped, and it must stay that way: the card deck is built from
            sticky siblings, which a transform or clip-path ancestor breaks.
            Wrapping it also hid the first thousand pixels of a section four
            viewports tall behind a clip, so it looked like it never arrived. */}
        <Process />
        <SectionReveal direction="left">
          <Team />
        </SectionReveal>
        <SectionReveal direction="mask">
          <Dossier />
        </SectionReveal>
        <Banner />
        <SectionReveal direction="right">
          <Contact />
        </SectionReveal>
        <SectionReveal direction="up">
          <Location />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}

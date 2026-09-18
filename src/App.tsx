import { useCallback, useEffect, useState } from 'react';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { VideoFeature } from './components/VideoFeature';
import { Collage } from './components/Collage';
import { About } from './components/About';
import { Ticker } from './components/Ticker';
import { TrackRecordStats } from './components/TrackRecordStats';
import { Projects } from './components/Projects';
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
      <Preloader onDone={onPreloaderDone} />
      <Cursor />
      <ScrollProgress />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <VideoFeature />
        <Collage />
        <About />
        <Ticker />
        <TrackRecordStats />
        <Projects />
        <InvestmentTypes />
        <Expertise />
        <Process />
        <Team />
        <Banner />
        <Contact />
        <Location />
      </main>
      <Footer />
    </>
  );
}

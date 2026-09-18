import { useCallback, useEffect, useState } from 'react';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { InvestmentTypes } from './components/InvestmentTypes';
import { Approach } from './components/Approach';
import { TrackRecord } from './components/TrackRecord';
import { CurrentProject } from './components/CurrentProject';
import { LeaderVideo } from './components/LeaderVideo';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  // Scroll stays locked behind the preloader so the hero reveal always plays.
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
      <Nav ready={ready} />

      <main>
        <Hero ready={ready} />
        <Intro />
        <InvestmentTypes />
        <Approach />
        <TrackRecord />
        <CurrentProject />
        <LeaderVideo />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

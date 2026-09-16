import { useCallback, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createJourney, type SceneClock } from '../animation/journey';
import { useJourney } from '../animation/useJourney';
import { useIntro } from '../animation/useIntro';
import { BrandMotif } from '../components/BrandMotif';
import { ContextCursor } from '../components/ContextCursor';
import { Intro } from '../components/Intro';
import { Navigation } from '../components/Navigation';
import { brand } from '../config/brand';
import { siteContent } from '../content/site-content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Hero } from '../sections/Hero';
import { Approach } from '../sections/Approach';
import { Systems } from '../sections/Systems';
import { Contact } from '../sections/Contact';

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const clock = useRef<SceneClock>({ h: 0, paused: false, ready: false });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const touch = useMediaQuery('(pointer: coarse)');
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const journey = useMemo(() => createJourney(touch, siteContent.work.items.length), [touch]);
  const finishIntro = useCallback(() => { clock.current.ready = true; setReady(true); }, []);
  useIntro(root, reduced, finishIntro);
  const { active, navigate } = useJourney(root, journey, clock, reduced, ready);
  const togglePause = () => { clock.current.paused = !paused; setPaused(!paused); };
  return <div ref={root} className={`experience ${reduced ? 'reduced' : 'motion'}`} data-ready={ready} style={{ '--journey-length': journey.total } as CSSProperties}>
    <BrandMotif source={brand.motif} journey={journey} clock={clock} reduced={reduced} />
    <Navigation active={active} navigate={navigate} reduced={reduced} paused={paused} togglePause={togglePause} />
    <div className="scroll-track" aria-hidden="true" />
    <main id="main-content">
      <Hero navigate={navigate} /><Approach /><Systems reduced={reduced} paused={paused} navigate={navigate} />
      <Contact paused={paused} togglePause={togglePause} />
    </main>
    <Intro />
    <ContextCursor enabled={fine && !reduced && ready} />
  </div>;
}

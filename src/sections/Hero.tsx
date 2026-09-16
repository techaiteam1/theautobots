import { useRef } from 'react';
import { brand } from '../config/brand';
import { siteContent } from '../content/site-content';
import { useFitText } from '../hooks/useFitText';

export function Hero({ navigate }: { navigate: (id: string, focus?: boolean) => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  useFitText(title, brand.companyName);
  return <section className="stage hero-stage" id="home" data-section="home" tabIndex={-1} aria-labelledby="hero-title">
    <div className="hero-composition">
      <div className="hero-title-line" data-intro><h1 id="hero-title" ref={title}>{brand.companyName}</h1></div>
      <p className="hero-descriptor" data-intro>{siteContent.hero.descriptor.map((word, i) => <span key={word}>{i > 0 && <span className="descriptor-dot" aria-hidden="true">·</span>}{word}</span>)}</p>
      <p className="hero-tagline" data-intro>{brand.tagline}</p>
    </div>
    <a href="#approach" className="scroll-cue" aria-label={siteContent.hero.scrollLabel} onClick={event => { event.preventDefault(); navigate('approach', true); }}><span /></a>
  </section>;
}

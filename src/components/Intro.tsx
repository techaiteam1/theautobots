import { brand } from '../config/brand';
import { siteContent } from '../content/site-content';

export function Intro() {
  return <div className="intro-overlay" aria-hidden="true">
    <span className="intro-identity">{brand.companyName}</span>
    <div className="intro-words">{siteContent.loader.words.map(word => <span className="intro-word" key={word}>{word}</span>)}</div>
    <span className="intro-count">000</span>
    <div className="intro-track"><div className="intro-progress" /></div>
  </div>;
}

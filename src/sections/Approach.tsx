import type { CSSProperties } from 'react';
import { siteContent } from '../content/site-content';

const anchors = [
  [18, 78, 80, 23, 24, 22], [81, 77, 15, 38, 84, 62],
  [20, 80, 80, 23, 27, 22], [80, 79, 15, 60, 84, 41],
  [19, 78, 81, 23, 24, 24], [79, 79, 16, 38, 84, 62],
];
const mobileAnchors = [
  [26, 86, 78, 14, 23, 16], [76, 88, 25, 80, 77, 16],
  [25, 14, 77, 83, 24, 85], [76, 13, 24, 17, 78, 78],
  [26, 87, 77, 14, 23, 18], [75, 87, 25, 80, 79, 17],
];
export function Approach() {
  return <section className="stage about-stage" id="approach" data-section="approach" tabIndex={-1} aria-labelledby="approach-title">
    <div className="approach-introduction"><h2 id="approach-title">{siteContent.about.title}</h2><p>{siteContent.about.description}</p></div>
    <div className="capabilities">{siteContent.capabilities.map((item, index) => {
      const a = anchors[index % anchors.length], m = mobileAnchors[index % mobileAnchors.length];
      const positions = (offset: number) => ({ '--x': `${a[offset]}%`, '--y': `${a[offset + 1]}%`, '--mx': `${m[offset]}%`, '--my': `${m[offset + 1]}%` }) as CSSProperties;
      return <div className="capability-group" key={item.title}>
        <h3 className="floating-word word-primary" style={positions(0)}>{item.title}</h3>
        <p className="floating-word word-secondary" style={positions(2)}>{item.detail}</p>
        <span className="floating-word word-mark" style={positions(4)} aria-hidden="true"><i /><span>{String(index + 1).padStart(2, '0')}</span></span>
      </div>;
    })}</div>
  </section>;
}

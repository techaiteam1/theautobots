import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../animation/gsap';
import { assetUrl } from '../config/assets';
import type { SystemStory } from '../content/site-content';
import { SystemVisual } from './SystemVisual';

export function MediaFrame({ item, reduced, paused }: { item: SystemStory; reduced: boolean; paused: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!item.alternateMedia || reduced || paused) return;
    const element = frame.current;
    const context = gsap.context(() => {
      gsap.timeline({ repeat: -1 }).set('.media-alternate', { opacity: 0 })
        .to('.media-alternate', { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, 4)
        .to('.media-alternate', { opacity: 0, duration: 1.5, ease: 'sine.inOut' }, 9.5);
    }, element!);
    return () => context.revert();
  }, [item.alternateMedia, reduced, paused]);
  return <div className="media-frame" ref={frame}>
    {item.visual
      ? <><span className="sr-only">{item.alt}</span><SystemVisual type={item.visual} reduced={reduced} paused={paused} /></>
      : item.media && <img src={assetUrl(item.media)} alt={item.alt} width="1080" height="576" loading="lazy" decoding="async" />}
    {item.alternateMedia && <img className="media-alternate" src={assetUrl(item.alternateMedia)} alt="" width="1080" height="576" loading="lazy" decoding="async" />}
    <div className="media-shade" />
    <i className="frame-corner top-left" /><i className="frame-corner top-right" /><i className="frame-corner bottom-left" /><i className="frame-corner bottom-right" />
  </div>;
}

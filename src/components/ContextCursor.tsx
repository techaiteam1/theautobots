import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../animation/gsap';
import { brand } from '../config/brand';
import { assetUrl } from '../config/assets';
import { siteContent } from '../content/site-content';

export function ContextCursor({ enabled }: { enabled: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !enabled) return;
    const context = gsap.context(() => {
      const ring = element.querySelector('.cursor-ring');
      const dot = element.querySelector('.cursor-dot');
      const hint = element.querySelector('.cursor-hint');
      const xRing = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3.out' });
      const yRing = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3.out' });
      const setDotX = gsap.quickSetter(dot, 'x', 'px'), setDotY = gsap.quickSetter(dot, 'y', 'px');
      const setHintX = gsap.quickSetter(hint, 'x', 'px'), setHintY = gsap.quickSetter(hint, 'y', 'px');
      const move = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        element.dataset.visible = 'true';
        xRing(event.clientX); yRing(event.clientY);
        setDotX(event.clientX); setDotY(event.clientY);
        setHintX(event.clientX); setHintY(event.clientY);
        const target = event.target as HTMLElement;
        element.dataset.kind = target.closest('[data-cursor="explore"]') ? 'explore'
          : target.closest('a,button') ? 'link' : 'normal';
      };
      const leave = () => { element.dataset.visible = 'false'; };
      document.documentElement.classList.add('custom-cursor');
      window.addEventListener('pointermove', move);
      document.addEventListener('pointerleave', leave);
      window.addEventListener('blur', leave);
      return () => {
        document.documentElement.classList.remove('custom-cursor');
        window.removeEventListener('pointermove', move);
        document.removeEventListener('pointerleave', leave);
        window.removeEventListener('blur', leave);
      };
    }, element);
    return () => context.revert();
  }, [enabled]);
  if (!enabled) return null;
  return <div className="context-cursor" ref={root} aria-hidden="true">
    <div className="cursor-ring"><span /></div><div className="cursor-dot" />
    <div className="cursor-hint"><img src={assetUrl(brand.motif)} alt="" /><span>{siteContent.work.openLabel}</span></div>
  </div>;
}

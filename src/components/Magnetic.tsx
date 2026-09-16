import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from '../animation/gsap';

export function Magnetic({ children, disabled = false }: { children: ReactNode; disabled?: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = wrapper.current;
    if (!element || disabled) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(element, 'x', { duration: 0.55, ease: 'settle' });
      const yTo = gsap.quickTo(element, 'y', { duration: 0.55, ease: 'settle' });
      let bounds: DOMRect;
      const enter = () => { bounds = element.parentElement!.getBoundingClientRect(); };
      const move = (event: PointerEvent) => {
        if (!bounds) enter();
        xTo(gsap.utils.clamp(-18, 18, (event.clientX - bounds.x - bounds.width / 2) * 0.14));
        yTo(gsap.utils.clamp(-12, 12, (event.clientY - bounds.y - bounds.height / 2) * 0.14));
      };
      const leave = () => { xTo(0); yTo(0); };
      element.addEventListener('pointerenter', enter);
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', leave);
      return () => {
        element.removeEventListener('pointerenter', enter);
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', leave);
      };
    });
    return () => media.revert();
  }, [disabled]);
  return <div className="magnetic" ref={wrapper}>{children}</div>;
}

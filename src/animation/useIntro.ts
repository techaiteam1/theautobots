import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from './gsap';

export function useIntro(root: RefObject<HTMLDivElement | null>, reduced: boolean, finish: () => void) {
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    const context = gsap.context(() => {
      if (!reduced) gsap.set('[data-intro]', { opacity: 0, y: 16 });
    }, element);
    const start = () => {
      if (disposed) return;
      context.add(() => {
        if (reduced) {
          gsap.set('.intro-overlay', { autoAlpha: 0 });
          gsap.set('[data-intro]', { opacity: 1, y: 0 });
          finish();
          return;
        }
        const words = element.querySelectorAll('.intro-word');
        const counter = element.querySelector('.intro-count');
        const progress = { value: 0 };
        const intro = gsap.timeline();
        intro.to(progress, { value: 100, duration: 2.25, ease: 'power1.inOut', onUpdate: () => {
          if (counter) counter.textContent = Math.round(progress.value).toString().padStart(3, '0');
        } }, 0);
        intro.fromTo('.intro-progress', { scaleX: 0 }, { scaleX: 1, duration: 2.25, ease: 'power1.inOut' }, 0);
        words.forEach((word, index) => {
          intro.fromTo(word, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'settle' }, index * 0.66);
          intro.to(word, { autoAlpha: 0, y: -20, duration: 0.3, ease: 'settle' }, index * 0.66 + 0.54);
        });
        intro.to('.intro-overlay', { autoAlpha: 0, duration: 0.6, ease: 'settle', onStart: finish }, 2.3);
        intro.to('[data-intro]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'settle' }, 2.35);
      });
    };
    void document.fonts.ready.then(start);
    return () => { disposed = true; context.revert(); };
  }, [root, reduced, finish]);
}

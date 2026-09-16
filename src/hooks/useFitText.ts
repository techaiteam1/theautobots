import { useLayoutEffect, type RefObject } from 'react';

/** Fit a replaceable name to the measured hero width, without horizontal distortion. */
export function useFitText(ref: RefObject<HTMLElement | null>, text: string) {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      element.style.fontSize = '100px';
      const measured = element.getBoundingClientRect().width;
      const available = document.documentElement.clientWidth * 0.935;
      element.style.fontSize = `${Math.min(available / Math.max(measured, 1) * 100, innerWidth * 0.15)}px`;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    void document.fonts.ready.then(measure);
    measure();
    return () => { cancelled = true; observer.disconnect(); };
  }, [ref, text]);
}

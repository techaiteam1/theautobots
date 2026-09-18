import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { gsap, ScrollTrigger } from './gsap';
import { type Journey, type SceneClock, type SectionId } from './journey';

export function useJourney(root: RefObject<HTMLDivElement | null>, journey: Journey, clock: RefObject<SceneClock>, reduced: boolean, ready: boolean) {
  const [active, setActive] = useState<SectionId>('home');
  const focusDestination = useRef<string | null>(null);
  const navigate = useCallback((id: string, focus = false) => {
    const section = root.current?.querySelector<HTMLElement>(`[data-section="${id}"]`);
    if (reduced) {
      section?.scrollIntoView({ behavior: 'instant', block: 'start' });
      if (focus) section?.focus({ preventScroll: true });
      return;
    }
    const positions: Record<string, number> = {
      home: 0, approach: journey.about + 0.1 * journey.pace,
      workflow: journey.bridge, systems: journey.work + 0.3 * journey.pace,
      operations: journey.operations, fit: journey.fit,
      contact: journey.contact,
    };
    focusDestination.current = focus ? id : null;
    window.scrollTo({ top: (positions[id] ?? 0) * innerHeight, behavior: 'instant' });
    if (focus && Math.abs(clock.current.h - (positions[id] ?? 0)) < 0.02) section?.focus({ preventScroll: true });
  }, [root, journey, reduced, clock]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const sections = [...element.querySelectorAll<HTMLElement>('[data-section]')];
    const panels = [...element.querySelectorAll<HTMLElement>('.system-panel')];
    if (reduced) {
      sections.forEach(section => { section.inert = false; section.removeAttribute('aria-hidden'); });
      panels.forEach(panel => { panel.inert = false; });
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.section as SectionId);
      }, { rootMargin: '-15% 0px -45% 0px' });
      sections.forEach(section => observer.observe(section));
      return () => observer.disconnect();
    }
    let lastActive = '';
    const updateAccess = (h: number) => {
      const current: SectionId = h >= journey.contact - 0.7 ? 'contact'
        : h >= journey.fit - 0.35 * journey.pace ? 'fit'
        : h >= journey.operations - 0.35 * journey.pace ? 'operations'
        : h >= journey.heading - 0.5 * journey.pace ? 'systems'
        : h >= journey.bridge - 0.35 * journey.pace ? 'workflow'
        : h >= journey.about - 0.4 * journey.pace ? 'approach' : 'home';
      if (lastActive !== current) {
        lastActive = current;
        setActive(current);
        sections.forEach(section => {
          const hidden = section.dataset.section !== current;
          section.inert = hidden;
          section.setAttribute('aria-hidden', String(hidden));
        });
      }
      panels.forEach((panel, i) => {
        const start = journey.work + i * journey.panelLength - 0.5 * journey.pace;
        panel.inert = h < start + 0.05 * journey.pace || h > start + 1.7 * journey.pace;
      });
      element.dataset.sceneH = h.toFixed(3);
    };
    const context = gsap.context(() => {
      const cursor = { h: 0 };
      const timeline = gsap.timeline({ paused: true, onUpdate: () => {
        clock.current.h = cursor.h;
        updateAccess(cursor.h);
      } });
      timeline.to(cursor, { h: journey.contact, duration: journey.contact, ease: 'none' }, 0);
      timeline.fromTo('.hero-stage', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: 'softStep' }, 0);
      timeline.set('.about-stage', { autoAlpha: 1 }, journey.about - 0.4 * journey.pace);
      timeline.set('.about-stage', { autoAlpha: 0 }, journey.aboutEnd + 0.15 * journey.pace);
      const groups = element.querySelectorAll('.capability-group');
      groups.forEach((group, index) => {
        const start = journey.about - 0.3 * journey.pace + index * (3.3 * journey.pace / Math.max(groups.length, 1));
        [...group.children].forEach((word, part) => {
          const at = start + part * 0.12 * journey.pace;
          timeline.fromTo(word, { autoAlpha: 0, y: part ? 14 : 28, filter: 'blur(8px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.18 * journey.pace, ease: 'settle' }, at);
          timeline.to(word, { y: part ? -8 : -12, duration: 0.2 * journey.pace, ease: 'none' }, at + 0.18 * journey.pace);
          timeline.to(word, { autoAlpha: 0, y: part ? -20 : -30, filter: 'blur(8px)', duration: 0.2 * journey.pace, ease: 'power1.in' }, at + 0.38 * journey.pace);
        });
      });
      timeline.set('.bridge-stage', { autoAlpha: 1 }, journey.bridge - 0.35 * journey.pace);
      timeline.fromTo('.bridge-inner', { autoAlpha: 0, y: 36, filter: 'blur(10px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.45 * journey.pace, ease: 'settle' }, journey.bridge - 0.22 * journey.pace);
      element.querySelectorAll('.bridge-markers span').forEach((marker, index) => {
        timeline.fromTo(marker, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.24 * journey.pace, ease: 'settle' }, journey.bridge + (0.12 + index * 0.08) * journey.pace);
      });
      timeline.to('.bridge-inner', { autoAlpha: 0, y: -24, filter: 'blur(8px)', duration: 0.4 * journey.pace, ease: 'settle' }, journey.bridgeEnd - 0.35 * journey.pace);
      timeline.set('.bridge-stage', { autoAlpha: 0 }, journey.bridgeEnd);
      timeline.set('.systems-stage', { autoAlpha: 1 }, journey.heading - 0.5 * journey.pace);
      timeline.fromTo('.stage-heading', { autoAlpha: 0, y: 22, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.25 * journey.pace, ease: 'settle' }, journey.heading - 0.5 * journey.pace);
      timeline.to('.stage-heading', { autoAlpha: 0, filter: 'blur(8px)', duration: 0.5 * journey.pace, ease: 'softStep' }, journey.work - 0.45 * journey.pace);
      panels.forEach((panel, index) => {
        const start = journey.work + index * journey.panelLength - 0.5 * journey.pace;
        timeline.fromTo(panel, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.5 * journey.pace, ease: 'settle' }, start);
        timeline.to(panel, { autoAlpha: 0, y: -30, duration: 0.5 * journey.pace, ease: 'settle' }, start + 1.2 * journey.pace);
      });
      timeline.set('.systems-stage', { autoAlpha: 0 }, journey.workEnd);
      timeline.fromTo('.philosophy-line', { autoAlpha: 0, y: 20, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'settle' }, journey.outro + 0.05);
      timeline.to('.philosophy-line', { autoAlpha: 0, y: -15, filter: 'blur(8px)', duration: 0.35 }, journey.outro + 0.65);
      timeline.set('.operations-stage', { autoAlpha: 1 }, journey.operations - 0.35 * journey.pace);
      timeline.fromTo('.operations-inner', { autoAlpha: 0, y: 34, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.45 * journey.pace, ease: 'settle' }, journey.operations - 0.25 * journey.pace);
      element.querySelectorAll('.control-rail span').forEach((control, index) => {
        timeline.fromTo(control, { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.24 * journey.pace, ease: 'settle' }, journey.operations + (0.2 + index * 0.11) * journey.pace);
      });
      timeline.to('.operations-inner', { autoAlpha: 0, y: -24, filter: 'blur(8px)', duration: 0.45 * journey.pace, ease: 'settle' }, journey.fit - 0.65 * journey.pace);
      timeline.set('.operations-stage', { autoAlpha: 0 }, journey.fit - 0.25 * journey.pace);
      timeline.set('.fit-stage', { autoAlpha: 1 }, journey.fit - 0.35 * journey.pace);
      timeline.fromTo('.fit-inner', { autoAlpha: 0, y: 34, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.45 * journey.pace, ease: 'settle' }, journey.fit - 0.2 * journey.pace);
      timeline.to('.fit-inner', { autoAlpha: 0, y: -24, filter: 'blur(8px)', duration: 0.45 * journey.pace, ease: 'settle' }, journey.contact - 0.75 * journey.pace);
      timeline.set('.fit-stage', { autoAlpha: 0 }, journey.contact - 0.35 * journey.pace);
      timeline.set('.contact-stage', { autoAlpha: 1 }, journey.contact - 0.7);
      const contactEntrance = gsap.fromTo('.contact-inner', { opacity: 0, y: 32, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'settle', paused: true });
      ScrollTrigger.create({ start: () => (journey.contact - 0.7) * innerHeight,
        onEnter: () => contactEntrance.play(), onLeaveBack: () => contactEntrance.pause(0) });
      ScrollTrigger.create({
        start: 0, end: () => journey.contact * innerHeight, animation: timeline,
        scrub: 0.7, invalidateOnRefresh: true,
        onScrubComplete: () => {
          const target = focusDestination.current;
          if (target) {
            element.querySelector<HTMLElement>(`[data-section="${target}"]`)?.focus({ preventScroll: true });
            focusDestination.current = null;
          }
        },
      });
      updateAccess(window.scrollY / innerHeight);
      ScrollTrigger.refresh();
    }, element);
    return () => {
      context.revert();
      sections.forEach(section => { section.inert = false; section.removeAttribute('aria-hidden'); });
      panels.forEach(panel => { panel.inert = false; });
    };
  }, [root, journey, clock, reduced, ready]);
  return { active, navigate };
}

import { useEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from '../animation/gsap';
import { createParticleScene, sampleMotif } from '../animation/particle-scene';
import type { Journey, SceneClock } from '../animation/journey';
import { assetUrl } from '../config/assets';

interface Props { source: string; journey: Journey; clock: RefObject<SceneClock>; reduced: boolean }
export function BrandMotif({ source, journey, clock, reduced }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    void sampleMotif(assetUrl(source)).then(points => {
      if (disposed || !canvas.current) return;
      if (!points.length) { setFallback(true); return; }
      const scene = createParticleScene(canvas.current, points, journey, clock.current, reduced);
      let lastH = -1;
      let lastPaused = false;
      const tick = (time: number) => {
        const state = clock.current;
        if ((!reduced && state.ready && (!state.paused || scene.interacting())) || lastH !== state.h || lastPaused !== state.paused) scene.draw(time);
        lastH = state.h;
        lastPaused = state.paused;
      };
      const resize = () => { scene.resize(); scene.draw(0); };
      const pointerMove = (event: PointerEvent) => { if (event.pointerType !== 'touch') scene.pointer(event.clientX, event.clientY, true); };
      const pointerLeave = () => scene.pointer(0, 0, false);
      gsap.ticker.add(tick);
      window.addEventListener('resize', resize);
      if (!reduced) {
        window.addEventListener('pointermove', pointerMove, { passive: true });
        document.addEventListener('pointerleave', pointerLeave);
        window.addEventListener('blur', pointerLeave);
      }
      cleanup = () => {
        gsap.ticker.remove(tick); window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', pointerMove);
        document.removeEventListener('pointerleave', pointerLeave);
        window.removeEventListener('blur', pointerLeave);
      };
    }).catch(() => { if (!disposed) setFallback(true); });
    return () => { disposed = true; cleanup(); };
  }, [source, journey, clock, reduced]);
  return <div className="scene" aria-hidden="true">
    <canvas ref={canvas} />
    {fallback && <img className="motif-fallback" src={assetUrl(source)} alt="" />}
  </div>;
}

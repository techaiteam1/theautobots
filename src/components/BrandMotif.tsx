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
        if ((!reduced && state.ready && !state.paused) || lastH !== state.h || lastPaused !== state.paused) scene.draw(time);
        lastH = state.h;
        lastPaused = state.paused;
      };
      const resize = () => { scene.resize(); scene.draw(0); };
      gsap.ticker.add(tick);
      window.addEventListener('resize', resize);
      cleanup = () => { gsap.ticker.remove(tick); window.removeEventListener('resize', resize); };
    }).catch(() => { if (!disposed) setFallback(true); });
    return () => { disposed = true; cleanup(); };
  }, [source, journey, clock, reduced]);
  return <div className="scene" aria-hidden="true">
    <canvas ref={canvas} />
    {fallback && <img className="motif-fallback" src={assetUrl(source)} alt="" />}
  </div>;
}

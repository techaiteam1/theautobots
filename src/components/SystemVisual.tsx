import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../animation/gsap';
import type { SystemStory } from '../content/site-content';

type VisualKey = NonNullable<SystemStory['visual']>;

function TransformationVisual() {
  return <svg className="system-visual" viewBox="0 0 1080 576" role="img" aria-hidden="true">
    <rect className="visual-surface" width="1080" height="576" />
    <g className="visual-grid">
      <path d="M72 96H1008M72 288H1008M72 480H1008M180 56V520M540 56V520M900 56V520" />
      <circle cx="540" cy="288" r="194" /><circle cx="540" cy="288" r="126" />
    </g>
    <g className="visual-muted-lines visual-transform-input">
      <path pathLength="1" d="M118 148H274L392 244L478 288" />
      <path pathLength="1" d="M118 288H478" />
      <path pathLength="1" d="M118 428H290L398 334L478 288" />
    </g>
    <g className="visual-nodes visual-transform-input-nodes">
      <rect x="106" y="136" width="24" height="24" /><rect x="106" y="276" width="24" height="24" /><rect x="106" y="416" width="24" height="24" />
      <circle cx="274" cy="148" r="7" /><circle cx="274" cy="288" r="7" /><circle cx="290" cy="428" r="7" />
    </g>
    <g className="visual-transform-core">
      <path className="visual-primary" d="M540 220L608 288L540 356L472 288Z" />
      <circle className="visual-core-fill" cx="540" cy="288" r="22" />
      <path className="visual-fine" d="M520 288h40M540 268v40" />
    </g>
    <path className="visual-primary visual-transform-output" pathLength="1" d="M608 288H690L752 220H834L900 288H966" />
    <g className="visual-output-nodes">
      <circle cx="690" cy="288" r="8" /><circle cx="752" cy="220" r="8" /><circle cx="834" cy="220" r="8" /><circle cx="900" cy="288" r="8" /><circle cx="966" cy="288" r="8" />
    </g>
    <path className="visual-transform-scan" d="M86 72V504" />
    <g className="visual-corner-marks"><path d="M72 112V72h40M968 504h40v-40" /></g>
  </svg>;
}

function AgenticVisual() {
  return <svg className="system-visual" viewBox="0 0 1080 576" role="img" aria-hidden="true">
    <rect className="visual-surface" width="1080" height="576" />
    <g className="visual-grid visual-agent-grid">
      <path d="M96 72H984V504H96ZM540 72V504M96 288H984" />
      <path d="M176 112L904 464M176 464L904 112" />
    </g>
    <g className="visual-agent-links">
      <path pathLength="1" d="M468 250C390 218 354 174 296 156" />
      <path pathLength="1" d="M612 250C690 218 726 174 784 156" />
      <path pathLength="1" d="M468 326C390 354 354 398 296 420" />
      <path pathLength="1" d="M612 326C690 354 726 398 784 420" />
      <path pathLength="1" d="M540 216V132" />
    </g>
    <g className="visual-agent-module">
      <rect x="154" y="112" width="142" height="88" rx="2" /><circle cx="190" cy="156" r="12" /><path d="M218 144h50M218 158h34M174 184h94" />
      <rect x="784" y="112" width="142" height="88" rx="2" /><circle cx="820" cy="156" r="12" /><path d="M848 144h50M848 158h34M804 184h94" />
      <rect x="154" y="376" width="142" height="88" rx="2" /><circle cx="190" cy="420" r="12" /><path d="M218 408h50M218 422h34M174 448h94" />
      <rect x="784" y="376" width="142" height="88" rx="2" /><circle cx="820" cy="420" r="12" /><path d="M848 408h50M848 422h34M804 448h94" />
    </g>
    <g className="visual-agent-hub">
      <path className="visual-primary" d="M540 204L622 248V328L540 372L458 328V248Z" />
      <circle className="visual-core-fill" cx="540" cy="288" r="31" />
      <circle className="visual-orbit" cx="540" cy="288" r="58" />
      <g className="visual-orbit-dots"><circle cx="540" cy="230" r="6" /><circle cx="590" cy="317" r="6" /><circle cx="490" cy="317" r="6" /></g>
    </g>
    <g className="visual-governance">
      <path d="M540 82L574 116L540 150L506 116Z" /><path d="m526 116 10 10 20-22" />
    </g>
    <g className="visual-tool-nodes"><circle cx="96" cy="288" r="8" /><circle cx="984" cy="288" r="8" /><circle cx="540" cy="504" r="8" /></g>
    <g className="visual-corner-marks"><path d="M72 112V72h40M968 504h40v-40" /></g>
  </svg>;
}

function OperationsVisual() {
  return <svg className="system-visual" viewBox="0 0 1080 576" role="img" aria-hidden="true">
    <rect className="visual-surface" width="1080" height="576" />
    <g className="visual-grid">
      <path d="M72 96H1008M72 480H1008M144 56V520M936 56V520" />
      <ellipse cx="540" cy="288" rx="364" ry="176" /><ellipse cx="540" cy="288" rx="292" ry="124" />
    </g>
    <path className="visual-primary visual-operations-loop" pathLength="1" d="M246 184C330 88 750 88 834 184C930 294 836 432 696 456C546 482 326 450 238 352C192 300 194 242 246 184Z" />
    <g className="visual-operation-stages">
      <g transform="translate(246 184)"><circle r="22" /><circle className="visual-core-fill" r="7" /></g>
      <g transform="translate(834 184)"><circle r="22" /><circle className="visual-core-fill" r="7" /></g>
      <g transform="translate(696 456)"><circle r="22" /><circle className="visual-core-fill" r="7" /></g>
      <g transform="translate(238 352)"><circle r="22" /><circle className="visual-core-fill" r="7" /></g>
    </g>
    <g className="visual-operations-core">
      <rect x="406" y="224" width="268" height="128" rx="64" />
      <path className="visual-signal" pathLength="1" d="M438 288H476L496 258L524 326L552 270L576 306L596 288H642" />
      <circle cx="540" cy="288" r="92" />
    </g>
    <g className="visual-governance visual-operations-governance">
      <path d="M540 82L574 116L540 150L506 116Z" /><path d="m526 116 10 10 20-22" />
    </g>
    <g className="visual-refinement"><path d="M856 336v72h-72" /><path d="m784 408 20-18M784 408l20 18" /></g>
    <g className="visual-corner-marks"><path d="M72 112V72h40M968 504h40v-40" /></g>
  </svg>;
}

export function SystemVisual({ type, reduced, paused }: { type: VisualKey; reduced: boolean; paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (reduced || paused || !root.current) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
      if (type === 'transformation') {
        timeline.fromTo('.visual-transform-input path', { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, stagger: 0.16, ease: 'power2.inOut' })
          .fromTo('.visual-transform-input-nodes > *', { scale: 0.35, opacity: 0.25 },
            { scale: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2)' }, 0.25)
          .to('.visual-transform-core', { rotation: 90, transformOrigin: '540px 288px', duration: 0.9, ease: 'settle' }, 1.05)
          .fromTo('.visual-transform-output', { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.35, ease: 'power2.inOut' }, 1.4)
          .fromTo('.visual-output-nodes > *', { scale: 0, transformOrigin: 'center' },
            { scale: 1, duration: 0.35, stagger: 0.11, ease: 'back.out(2)' }, 1.6)
          .fromTo('.visual-transform-scan', { x: 0, opacity: 0 }, { x: 900, opacity: 0.55, duration: 2.1, ease: 'power1.inOut' }, 0.5)
          .to({}, { duration: 1.2 });
      } else if (type === 'agentic-systems') {
        timeline.fromTo('.visual-agent-links path', { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.3, stagger: 0.12, ease: 'power2.inOut' })
          .fromTo('.visual-agent-module > rect, .visual-agent-module > circle', { scale: 0.75, opacity: 0.3, transformOrigin: 'center' },
            { scale: 1, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'back.out(1.7)' }, 0.35)
          .to('.visual-orbit-dots', { rotation: 360, transformOrigin: '540px 288px', duration: 5.5, ease: 'none' }, 0)
          .to('.visual-agent-hub .visual-core-fill', { scale: 1.25, transformOrigin: 'center', repeat: 3, yoyo: true, duration: 0.5, ease: 'sine.inOut' }, 1.1)
          .to('.visual-governance', { scale: 1.12, transformOrigin: '540px 116px', repeat: 1, yoyo: true, duration: 0.45, ease: 'sine.inOut' }, 1.6)
          .to({}, { duration: 1.3 });
      } else {
        timeline.fromTo('.visual-operations-loop', { strokeDasharray: '0.12 0.05', strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 4.8, ease: 'none' })
          .fromTo('.visual-operation-stages > g', { scale: 0.7, opacity: 0.45, transformOrigin: 'center' },
            { scale: 1.18, opacity: 1, duration: 0.45, stagger: 0.7, repeat: 1, yoyo: true, ease: 'sine.inOut' }, 0.2)
          .fromTo('.visual-signal', { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, repeat: 2, ease: 'power2.inOut' }, 0.5)
          .to('.visual-operations-governance', { scale: 1.12, transformOrigin: '540px 116px', repeat: 1, yoyo: true, duration: 0.5 }, 2)
          .to('.visual-refinement', { x: -8, y: -8, repeat: 1, yoyo: true, duration: 0.55, ease: 'sine.inOut' }, 3.1);
      }
    }, root);
    return () => context.revert();
  }, [type, reduced, paused]);

  return <div className="system-visual-shell" ref={root}>
    {type === 'transformation' ? <TransformationVisual /> : type === 'agentic-systems' ? <AgenticVisual /> : <OperationsVisual />}
  </div>;
}

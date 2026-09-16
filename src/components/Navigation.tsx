import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { gsap } from '../animation/gsap';
import type { SectionId } from '../animation/journey';
import { assetUrl } from '../config/assets';
import { brand } from '../config/brand';
import { siteContent } from '../content/site-content';

interface Props { active: SectionId; navigate: (id: string, focus?: boolean) => void; reduced: boolean; paused: boolean; togglePause: () => void }
export function Navigation({ active, navigate, reduced, paused, togglePause }: Props) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const content = siteContent.navigation;
  useLayoutEffect(() => {
    const menu = panel.current;
    if (!menu) return;
    const context = gsap.context(() => {
      if (open) {
        gsap.fromTo(menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduced ? 0 : 0.35, ease: 'settle' });
        gsap.fromTo('.menu-link', { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: reduced ? 0 : 0.07, duration: reduced ? 0 : 0.65, ease: 'settle' });
      } else gsap.set(menu, { autoAlpha: 0 });
    }, menu);
    if (!open) return () => context.revert();
    const savedOverflow = document.body.style.overflow;
    const opener = toggle.current;
    document.body.style.overflow = 'hidden';
    const main = document.querySelector('main');
    if (main) main.inert = true;
    const controls = [...menu.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('a,button')];
    controls[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key === 'Tab') {
        const index = controls.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.shiftKey ? (index - 1 + controls.length) % controls.length : (index + 1) % controls.length;
        event.preventDefault(); controls[next]?.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      context.revert(); document.body.style.overflow = savedOverflow;
      if (main) main.inert = false;
      opener?.focus();
      document.removeEventListener('keydown', keydown);
    };
  }, [open, reduced]);
  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    navigate(id, true);
  };
  return <>
    <a className="skip-link" href="#approach" onClick={event => go(event, 'approach')}>{content.skip}</a>
    <header className="site-header" inert={open}>
      <a className="brand-link" href="#home" aria-label={`${brand.companyName} — ${content.home}`} onClick={event => go(event, 'home')}>
        {brand.logoMode === 'image' ? <img src={assetUrl(brand.logo)} alt={brand.companyName} /> : brand.companyName}
      </a>
      <nav className="desktop-nav" aria-label={content.label} inert={open}>
        {content.links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? 'location' : undefined} onClick={event => go(event, link.id)}>{link.label}<span className="nav-dot" /></a>)}
      </nav>
      <div className="header-controls"><span className="language" lang="en">{content.language}</span><span className="control-divider" aria-hidden="true">/</span>
        <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => { if (open) toggle.current?.focus(); setOpen(!open); }}>{open ? content.close : content.menu}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
      </div>
    </header>
    <div ref={panel} className="menu-panel" id="site-menu" role="dialog" aria-modal={open ? true : undefined} aria-label={content.index} aria-hidden={!open} inert={!open}>
      <div className="menu-header"><span className="brand-link">{brand.companyName}</span><button type="button" className="menu-toggle" onClick={() => setOpen(false)}>{content.close}<span aria-hidden="true">−</span></button></div>
      <div className="menu-inner"><p className="eyebrow">{content.index}</p>
        <nav aria-label={content.label}>{content.links.map((link, i) => <a className="menu-link" key={link.id} href={`#${link.id}`} onClick={event => go(event, link.id)}><span className="menu-number">0{i + 1}</span>{link.label}<span className="menu-arrow" aria-hidden="true">↗</span></a>)}</nav>
        <p className="menu-tagline">{brand.tagline}</p>
        {!reduced && <button type="button" className="menu-motion" aria-pressed={paused} onClick={togglePause}>{paused ? siteContent.contact.resume : siteContent.contact.pause}<span aria-hidden="true"> {paused ? '▷' : 'Ⅱ'}</span></button>}
      </div>
    </div>
  </>;
}

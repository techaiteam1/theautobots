import { useEffect, useRef, useState } from 'react';
import { brand } from '../config/brand';
import { siteContent } from '../content/site-content';
import { gsap } from '../animation/gsap';

export function Contact({ paused, togglePause }: { paused: boolean; togglePause: () => void }) {
  const [message, setMessage] = useState('');
  const clearMessage = useRef<gsap.core.Tween | null>(null);
  useEffect(() => () => { clearMessage.current?.kill(); }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(brand.contact.email); setMessage(siteContent.contact.copied); }
    catch { setMessage(siteContent.contact.copyFailed); }
    clearMessage.current?.kill();
    clearMessage.current = gsap.delayedCall(3, () => setMessage(''));
  };
  const socials = (['linkedin', 'instagram'] as const).filter(key => brand.contact[key]);
  const bookingUrl = brand.contact.bookingUrl.trim();
  return <>
    <section className="stage contact-stage" id="contact" data-section="contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title">{siteContent.contact.invitation}</h2>
        <button className="contact-address" type="button" onClick={() => void copy()} aria-describedby="copy-feedback">{brand.contact.email}</button>
        <p id="copy-feedback" className="copy-feedback" aria-live="polite">{message || siteContent.contact.copyHint}</p>
        <div className="contact-links">
          {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer">{siteContent.contact.book}<span aria-hidden="true"> ↗</span></a>}
          <a href={`mailto:${brand.contact.email}`}>{siteContent.contact.send}<span aria-hidden="true"> ↗</span></a>
          {socials.map(key => <a key={key} href={brand.contact[key]} target="_blank" rel="noopener noreferrer">{siteContent.contact.socialLabels[key]}</a>)}
        </div>
      </div>
      <footer className="site-footer"><span>© {new Date().getFullYear()} {brand.companyName}</span><span className="footer-note">{siteContent.contact.footer}</span>
        <button type="button" className="motion-toggle" onClick={togglePause} aria-pressed={paused} aria-label={paused ? siteContent.contact.resume : siteContent.contact.pause}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>
      </footer>
    </section>
  </>;
}

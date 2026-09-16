import { Magnetic } from '../components/Magnetic';
import { MediaFrame } from '../components/MediaFrame';
import { siteContent, type SystemStory } from '../content/site-content';

export function Systems({ reduced, paused, navigate }: { reduced: boolean; paused: boolean; navigate: (id: string, focus?: boolean) => void }) {
  const items: SystemStory[] = siteContent.work.items;
  return <section className="stage systems-stage" id="systems" data-section="systems" tabIndex={-1} aria-labelledby="systems-title">
    <h2 className="stage-heading" id="systems-title">{siteContent.work.title}</h2>
    <p className="sr-only">{siteContent.work.description}</p>
    {items.map((item, index) => {
      const content = <><MediaFrame item={item} reduced={reduced} paused={paused} /><div className="system-caption">
        <p className="system-eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><p className="system-description">{item.description}</p>
        {item.href && <span className="touch-link">{siteContent.work.openLabel}<span aria-hidden="true"> ↗</span></span>}
      </div></>;
      return <div className={`panel-slot ${index % 2 ? 'panel-right' : 'panel-left'}`} key={item.id}>
        <article className="system-panel" data-story={item.id}>
          <Magnetic disabled={reduced}>
            {item.href ? <a className="system-card" href={item.href} data-cursor="explore" onClick={event => {
              if (item.href?.startsWith('#')) { event.preventDefault(); navigate(item.href.slice(1), true); }
            }}>{content}</a> : <div className="system-card">{content}</div>}
          </Magnetic>
        </article>
      </div>;
    })}
  </section>;
}

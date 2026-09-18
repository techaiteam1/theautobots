import { siteContent } from '../content/site-content';

export function BridgeScene() {
  return <section className="stage bridge-stage" id="workflow" data-section="workflow" tabIndex={-1} aria-labelledby="workflow-title">
    <div className="bridge-inner">
      <p className="narrative-eyebrow">{siteContent.bridge.eyebrow}</p>
      <h2 id="workflow-title">{siteContent.bridge.title}</h2>
      <p>{siteContent.bridge.body}</p>
      <div className="bridge-markers" aria-label="Revenue path markers">
        {siteContent.bridge.markers.map(marker => <span key={marker}>{marker}</span>)}
      </div>
    </div>
  </section>;
}

export function OperationsScene() {
  return <>
    <p className="philosophy-line">{siteContent.philosophy.statement}</p>
    <section className="stage operations-stage" id="operations" data-section="operations" tabIndex={-1} aria-labelledby="operations-title">
      <div className="operations-inner">
        <p className="narrative-eyebrow">{siteContent.operations.eyebrow}</p>
        <h2 id="operations-title">{siteContent.operations.title}</h2>
        <p>{siteContent.operations.body}</p>
        <div className="control-rail" aria-label="Operating controls">
          {siteContent.operations.controls.map((control, index) => <span key={control}><i aria-hidden="true">{String(index + 1).padStart(2, '0')}</i>{control}</span>)}
        </div>
      </div>
    </section>
  </>;
}

export function FitScene() {
  return <section className="stage fit-stage" id="fit" data-section="fit" tabIndex={-1} aria-labelledby="fit-title">
    <div className="fit-inner">
      <p className="narrative-eyebrow">{siteContent.fit.eyebrow}</p>
      <h2 id="fit-title">{siteContent.fit.title}</h2>
      <p>{siteContent.fit.body}</p>
    </div>
  </section>;
}

export interface SystemStory {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  visual?: 'transformation' | 'agentic-systems' | 'managed-operations';
  media?: string;
  alternateMedia?: string;
  alt: string;
  href?: string;
}

export const siteContent = {
  navigation: {
    label: 'Main navigation',
    links: [
      { id: 'approach', label: 'Approach' },
      { id: 'systems', label: 'Systems' },
      { id: 'contact', label: 'Contact' },
    ],
    menu: 'Menu', close: 'Close', language: 'EN', home: 'Back to the beginning',
    skip: 'Skip to content', index: 'Explore',
  },
  loader: { words: ['Transform', 'Operate', 'Evolve'], label: 'Opening the experience' },
  hero: {
    descriptor: ['Revenue', 'Systems', 'Operations'],
    scrollLabel: 'Explore our approach',
  },
  about: {
    title: 'Turn inbound work into an operating system.',
    description: 'The Auto Bots helps agencies and service firms turn lead qualification, CRM hygiene, routing, follow-up and reporting into AI-assisted revenue operations systems.',
  },
  capabilities: [
    { title: 'Qualify', detail: 'Inbound signal' },
    { title: 'Route', detail: 'Clean handoff' },
    { title: 'Enrich', detail: 'Useful context' },
    { title: 'Follow up', detail: 'Consistent motion' },
    { title: 'Sync', detail: 'CRM hygiene' },
    { title: 'Report', detail: 'Operational truth' },
  ],
  work: {
    title: 'Revenue systems',
    description: 'Four connected revenue operations workflows. The illustrations are original concept studies, not client projects.',
    openLabel: 'Book a strategy call',
    items: [
      {
        id: 'inbound-qualification', eyebrow: '01 / Capture & qualify', title: 'Inbound lead qualification',
        description: 'Capture, enrich, score and route inbound leads so high-intent prospects do not sit untouched.',
        visual: 'transformation', alt: 'Fragmented workflow paths converging through a transformation point into one clear operating flow.',
      },
      {
        id: 'crm-hygiene', eyebrow: '02 / Sync & validate', title: 'CRM synchronization and hygiene',
        description: 'Keep forms, inboxes, CRMs and internal systems aligned so your team is not selling from incomplete data.',
        visual: 'agentic-systems', alt: 'Specialized agents and tools coordinating through a central human-governed system.',
      },
      {
        id: 'proposal-follow-up', eyebrow: '03 / Trigger & remember', title: 'Proposal follow-up workflows',
        description: 'Move opportunities with structured follow-up based on stage, timing, response behavior and business rules.',
        visual: 'managed-operations', alt: 'A monitored operational loop continuously observing, governing and refining AI workflows.',
      },
      {
        id: 'reporting-automation', eyebrow: '04 / Monitor & improve', title: 'Reporting automation',
        description: 'Turn scattered tool data into usable operating reports without rebuilding the same spreadsheet every week.',
        visual: 'transformation', alt: 'Workflow paths resolving into a clear operating view for reporting and decision-making.',
        href: '#contact',
      },
    ] satisfies SystemStory[],
  },
  bridge: {
    eyebrow: 'First, map the revenue path',
    title: 'Lead capture, qualification, CRM, handoff, follow-up, reporting.',
    body: 'The system starts where the work actually slows down. We trace each handoff, decision and exception before deciding what AI should touch.',
    markers: ['Capture', 'Qualify', 'Route', 'Follow up', 'Report'],
  },
  philosophy: { label: 'The offer', statement: 'Built for production, not AI theater.' },
  operations: {
    eyebrow: 'AI Revenue Operations',
    title: 'Control stays in the operating model.',
    body: 'We build around the highest-friction path from lead capture to CRM, handoff, follow-up and reporting. The work stays operational: validation, permissions, monitoring and human approval where the risk is too high for blind automation.',
    controls: ['Validate inputs', 'Escalate exceptions', 'Monitor outcomes'],
  },
  fit: {
    eyebrow: 'Best fit',
    title: 'For teams with demand, a CRM and a workflow owner.',
    body: 'The strongest projects already have meaningful inbound activity and a repeated process worth improving. We are not adding AI theater to a vague funnel; we are tightening the operating system behind revenue.',
  },
  contact: {
    invitation: 'If inbound operations are slowing growth, we should talk.',
    copyHint: 'Click to copy the address',
    copied: 'Address copied',
    copyFailed: 'Select the address to copy it',
    book: 'Book a strategy call',
    send: 'Email us',
    footer: 'Revenue systems. Human control.',
    socialLabels: { linkedin: 'LinkedIn', instagram: 'Instagram' },
    pause: 'Pause ambient motion', resume: 'Resume ambient motion',
  },
};

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
    descriptor: ['AI', 'Agents', 'Operations'],
    scrollLabel: 'Explore our approach',
  },
  about: {
    title: 'A different way to work.',
    description: 'The Auto Bots helps organizations transform business workflows and operations into AI-powered, agentic systems.',
  },
  capabilities: [
    { title: 'Transformation', detail: 'Business first' },
    { title: 'AI agents', detail: 'Purpose-built' },
    { title: 'Workflows', detail: 'Connected work' },
    { title: 'Operations', detail: 'Always evolving' },
    { title: 'Governance', detail: 'Human-led' },
    { title: 'Infrastructure', detail: 'Built to grow' },
  ],
  work: {
    title: 'Systems',
    description: 'Three connected areas of our work. The illustrations are original concept studies, not client projects.',
    openLabel: 'Explore',
    items: [
      {
        id: 'transformation', eyebrow: '01 / Understand & transform', title: 'AI transformation',
        description: 'Rethink the workflow. Find where AI belongs in your business.',
        visual: 'transformation', alt: 'Fragmented workflow paths converging through a transformation point into one clear operating flow.',
      },
      {
        id: 'agentic-systems', eyebrow: '02 / Connect & orchestrate', title: 'Custom agentic systems',
        description: 'Purpose-built agents, connected tools and intelligent workflows. Designed around the way you work.',
        visual: 'agentic-systems', alt: 'Specialized agents and tools coordinating through a central human-governed system.',
      },
      {
        id: 'managed-operations', eyebrow: '', title: 'Managed AI operations',
        description: 'Human oversight. Continuous refinement. A path from individual workflows to AI operating infrastructure.',
        visual: 'managed-operations', alt: 'A monitored operational loop continuously observing, governing and refining AI workflows.',
        href: '#contact',
      },
    ] satisfies SystemStory[],
  },
  philosophy: { label: 'The direction', statement: 'From transformation to operating infrastructure.' },
  contact: {
    invitation: 'What could your business become?',
    copyHint: 'Click to copy the address',
    copied: 'Address copied',
    copyFailed: 'Select the address to copy it',
    send: 'Write to us',
    footer: 'Human intention. Intelligent operations.',
    socialLabels: { linkedin: 'LinkedIn', instagram: 'Instagram' },
    pause: 'Pause ambient motion', resume: 'Resume ambient motion',
  },
};

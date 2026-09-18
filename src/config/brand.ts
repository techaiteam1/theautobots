/** Identity, destinations and metadata. Visual tokens live in styles/tokens.css. */
export const brand = {
  companyName: 'The Auto Bots',
  tagline: 'Transform - Operate - Evolve',
  logo: '/brand/logo.svg',
  // The quiet text identity matches the reference. Switch to "image" for your logo.
  logoMode: 'text' as 'text' | 'image',
  motif: '/brand/logo.jpeg',
  contact: {
    email: 'theautobots.ai@gmail.com',
    bookingUrl: '',
    linkedin: '',
    instagram: '',
  },
  seo: {
    title: 'The Auto Bots | AI Revenue Operations Systems',
    description: 'AI revenue operations systems for agencies and service firms. The Auto Bots helps teams qualify leads, keep CRM data clean, route work and follow up with human oversight.',
    // Replace with the owned custom HTTPS origin after its DNS is connected.
    siteUrl: 'https://techaiteam1.github.io/theautobots',
    language: 'en',
    locale: 'en_US',
    favicon: '/brand/favicon.svg',
    socialImage: '/brand/social-preview.png',
    socialImageAlt: 'The Auto Bots - Transform, Operate, Evolve',
  },
};

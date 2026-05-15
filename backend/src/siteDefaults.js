/** Default site copy and media paths (merged when `site` is missing in data.json). */
export function getDefaultSite() {
  return {
    global: {
      siteName: 'Aksent',
      logoUrl: '/aksent-logo.png',
      footerBrand: 'Aksent',
      footerTagline: 'Knowledge Systems · Strategic Communication · Design Intelligence',
      footerPhone: '+254 722 311 089',
      footerEmail: 'hello@aksent.co.ke',
      footerAddress: 'Jabavu Road, Kilimani · Nairobi, Kenya',
      footerWebUrl: 'https://www.aksent.co.ke',
      footerWebLabel: 'www.aksent.co.ke',
      copyright: '© AKSENT. All rights reserved.',
    },
    home: {
      heroSlides: ['/hero/101.jpg', '/hero/102.jpg', '/hero/103.jpg'],
      heroIndexLabel: 'Knowledge / Design / Communication',
      heroTitleLine1: 'Clarity is',
      heroTitleEmphasis: 'structure.',
      heroLead:
        'AKSENT translates complex work into communication people understand. Research, institutions, and brands rely on clarity to move ideas across audiences.',
      heroCtaPrimary: 'View our work',
      heroCtaSecondary: 'Start a conversation',
      featured: [
        { slug: 'amcham', cat: 'Campaign Communication', num: '01' },
        { slug: 'hivos', cat: 'Campaign Communication', num: '02' },
        { slug: 'womankind-worldwide', cat: 'Knowledge Publication', num: '03' },
        { slug: 'krk-advocates', cat: 'Brand System', num: '04' },
      ],
      servicesLabel: 'What we do',
      servicesHeadline: 'We work with organisations that produce complex knowledge.',
      servicesHeadlineEmphasis: 'complex knowledge.',
      servicesItems: [
        'Campaign communication',
        'Research and publication design',
        'Institutional storytelling',
        'Brand and communication systems',
      ],
      pullQuote: 'Design is structure.',
      ctaHeadingLine1: 'Ready to work',
      ctaHeadingEmphasis: 'together?',
      ctaSub:
        'We translate complex work into communication people understand. Clarity is not a finish — it is a foundation.',
      ctaButton: 'Start a conversation',
    },
    work: {
      heroLabel: 'Selected projects',
      heroTitleLine1: 'Our',
      heroTitleEmphasis: 'work.',
      heroLead:
        'We structure complex work into communication systems that move across audiences, institutions, and public space.',
      ctaHeadingLine1: 'Ready to work',
      ctaHeadingEmphasis: 'together?',
      ctaSub:
        'We translate complex work into communication people understand. Clarity is not a finish — it is a foundation.',
      ctaButton: 'Start a conversation',
    },
    about: {
      heroLabel: 'About AKSENT',
      heroTitleLine1: 'Who we',
      heroTitleEmphasis: 'are.',
      carouselImages: [
        '/about-carousel/01.png',
        '/about-carousel/02.png',
        '/about-carousel/03.png',
        '/about-carousel/04.png',
        '/about-carousel/05.png',
        '/about-carousel/06.png',
        '/about-carousel/07.png',
        '/about-carousel/08.png',
      ],
      foundingYear: '2009',
      foundingLead: 'Founded as a design studio. Built into a knowledge communication practice.',
      foundingParagraphs: [
        'Over time the practice expanded beyond traditional design work into the field of knowledge communication — helping organisations translate complex research, programmes, and institutional work into communication that people can understand.',
        'Today AKSENT operates at the intersection of design, knowledge systems, and institutional storytelling.',
        'We work with research organisations, foundations, and mission-driven businesses that produce complex ideas and need those ideas to travel clearly across audiences.',
        'Our role is to build the structures that allow that communication to happen — through publications, campaigns, and visual systems that make knowledge usable.',
      ],
      stats: [
        { value: '15+', valueHtml: '15<em>+</em>', label: 'Years of design practice' },
        { value: 'Cross-sector', valueHtml: 'Cross<em>-</em>sector', label: 'Climate, gender equity, research, finance, and hospitality.' },
        { value: 'Global', valueHtml: '<em>Global</em>', label: 'Projects delivered across Africa, Europe, and global institutional networks.' },
      ],
      howLabel: 'How we work',
      howHeadlineLine1: 'Design as',
      howHeadlineEmphasis: 'structure.',
      howParagraphs: [
        'AKSENT approaches design as structure. We organise information, shape narrative, and build visual systems that allow complex work to move clearly across audiences.',
        "We don't decorate — we construct. Every brief begins with a question about how knowledge travels: who needs to receive it, in what form, and across what distance.",
        'The answer shapes everything from the publication layout to the campaign arc to the brand architecture.',
      ],
      ctaHeadingLine1: 'Ready to work',
      ctaHeadingEmphasis: 'together?',
      ctaSub:
        'We translate complex work into communication people understand. Clarity is not a finish — it is a foundation.',
      ctaButton: 'Start a conversation',
    },
    contact: {
      heroLabel: 'Get in touch',
      heroTitleLine1: "Let's",
      heroTitleEmphasis: 'talk.',
      intro:
        'Start a conversation to discuss knowledge systems, publishing, or studio work. We typically respond within 1–2 business days.',
      phone: '+254 722 311 089',
      phoneTel: '+254722311089',
      email: 'hello@aksent.co.ke',
      addressHtml: 'Jabavu Road, Kilimani<br />Nairobi, Kenya',
      webUrl: 'https://www.aksent.co.ke',
      webLabel: 'www.aksent.co.ke',
      statementLabel: 'AKSENT Studio',
      statementHeadingLine1: 'Clarity is not a finish —',
      statementHeadingEmphasis: 'foundation.',
      statementSub: 'For projects, collaborations, or general enquiries, reach out via email or phone.',
      statementButton: 'Send us an email',
    },
  };
}

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

/** Deep-merge saved site content over defaults. */
export function mergeSite(saved) {
  const base = getDefaultSite();
  if (!isPlainObject(saved)) return base;

  const out = structuredClone(base);
  for (const key of Object.keys(saved)) {
    if (isPlainObject(saved[key]) && isPlainObject(out[key])) {
      out[key] = { ...out[key], ...saved[key] };
      if (key === 'about' && Array.isArray(saved.about?.stats)) {
        out.about.stats = saved.about.stats;
      }
      if (key === 'about' && Array.isArray(saved.about?.foundingParagraphs)) {
        out.about.foundingParagraphs = saved.about.foundingParagraphs;
      }
      if (key === 'about' && Array.isArray(saved.about?.howParagraphs)) {
        out.about.howParagraphs = saved.about.howParagraphs;
      }
      if (key === 'about' && Array.isArray(saved.about?.carouselImages)) {
        out.about.carouselImages = saved.about.carouselImages;
      }
      if (key === 'home' && Array.isArray(saved.home?.heroSlides)) {
        out.home.heroSlides = saved.home.heroSlides;
      }
      if (key === 'home' && Array.isArray(saved.home?.featured)) {
        out.home.featured = saved.home.featured;
      }
      if (key === 'home' && Array.isArray(saved.home?.servicesItems)) {
        out.home.servicesItems = saved.home.servicesItems;
      }
    } else if (saved[key] !== undefined) {
      out[key] = saved[key];
    }
  }
  return out;
}

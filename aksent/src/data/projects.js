/**
 * Project showcase data. Images live in public/projects/<slug>/
 */
const amchamImages = [
  '/projects/amcham/01.png',
  '/projects/amcham/02.png',
  '/projects/amcham/03.png',
  '/projects/amcham/04.png',
  '/projects/amcham/05.png',
  '/projects/amcham/06.png',
  '/projects/amcham/07.png',
  '/projects/amcham/08.png',
  '/projects/amcham/09.png',
  '/projects/amcham/10.png',
  '/projects/amcham/11.png',
];
const africanBiodigesterImages = Array.from({ length: 16 }, (_, i) => `/projects/african-biodester/${i + 1}.jpg`);
// ACRE Africa gallery: keep "page 9" first, then append new pages.
const acreAfricaImages = [
  '/projects/acre-africa/09.jpg',
  '/projects/acre-africa/21.png',
  '/projects/acre-africa/22.png',
  '/projects/acre-africa/23.png',
  '/projects/acre-africa/24.png',
  '/projects/acre-africa/25.png',
  '/projects/acre-africa/26.png',
  '/projects/acre-africa/27.png',
  '/projects/acre-africa/28.png',
];
const bimaSalamaImages = Array.from({ length: 6 }, (_, i) => `/projects/bima-salama/${String(i + 1).padStart(2, '0')}.jpg`);
const krkAdvocatesImages = [
  '/projects/krk-advocates/01.png',
  '/projects/krk-advocates/02.png',
];
const redssImages = Array.from({ length: 12 }, (_, i) => `/projects/redss/${String(i + 1).padStart(2, '0')}.png`);
const icpacImages = Array.from({ length: 9 }, (_, i) => `/projects/icpac/${String(i + 1).padStart(2, '0')}.png`);
const hivosImages = Array.from({ length: 12 }, (_, i) => `/projects/hivos/${String(i + 1).padStart(2, '0')}.png`);
const womankindWorldwideImages = Array.from({ length: 5 }, (_, i) => `/projects/womankind-worldwide/${String(i + 1).padStart(2, '0')}.png`);
const movenpickImages = Array.from({ length: 4 }, (_, i) => `/projects/movenpick/${String(i + 1).padStart(2, '0')}.png`);
const sankaraImages = Array.from({ length: 9 }, (_, i) => `/projects/sankara/${String(i + 1).padStart(2, '0')}.png`);

export const PROJECTS = [
  {
    slug: 'amcham',
    title: 'American Chamber of Commerce Kenya',
    description: 'Business summit brand development for AMCHAM Kenya.',
    images: amchamImages,
  },
  {
    slug: 'hivos',
    title: 'Hivos',
    description: 'Knowledge publication and campaign design for Hivos.',
    images: hivosImages,
  },
  {
    slug: 'womankind-worldwide',
    title: 'WomanKind Worldwide',
    description: 'Knowledge publication and policy brief design for WomanKind Worldwide.',
    primaryCapability: 'publications',
    images: womankindWorldwideImages,
  },
  {
    slug: 'african-biodigester',
    title: 'African Biodigester Component-Kenya',
    description: 'Campaign communication and visual identity for biodigester adoption programmes.',
    primaryCapability: 'campaign',
    images: africanBiodigesterImages,
  },
  {
    slug: 'acre-africa',
    title: 'ACRE Africa',
    description: 'Profile and publication design for ACRE Africa.',
    primaryCapability: 'publications',
    images: acreAfricaImages,
  },  {
    slug: 'bima-salama',
    title: 'Bima Salama',
    description: 'Insurance and brand communication.',
    primaryCapability: 'campaign',
    images: bimaSalamaImages,
  },
  {
    slug: 'krk-advocates',
    title: 'KRK Advocates',
    description: 'Legal and brand communication for KRK Advocates.',
    primaryCapability: 'brand',
    images: krkAdvocatesImages,
  },
  {
    slug: 'redss',
    title: 'ReDSS',
    description: 'Research and dissemination support for ReDSS.',
    primaryCapability: 'publications',
    images: redssImages,
  },
  {
    slug: 'icpac',
    title: 'ICPAC',
    description: 'Knowledge and communication design for ICPAC.',
    primaryCapability: 'institutional',
    images: icpacImages,
  },
  {
    slug: 'movenpick',
    title: 'Mövenpick',
    description: 'Brand and experience design for Mövenpick.',
    images: movenpickImages,
  },
  {
    slug: 'sankara',
    title: 'Sankara',
    description: 'Brand and communication design for Sankara.',
    images: sankaraImages,
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

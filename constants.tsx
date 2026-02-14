
import { Photographer } from './types';
import { JAZZ_CAFE_IMAGES } from './gallery';

export const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: 'Nico Bowers is a photographer focused on creating calm, intentional images that emphasize atmosphere, composition, and honesty. His work centers on observation and presence rather than spectacle.',
    works: [],
    collections: [
      {
        name: 'Jazz Cafe collection',
        images: JAZZ_CAFE_IMAGES.map(img => img.url)
      }
    ]
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: 'Coming Soon',
    isPlaceholder: true,
  },
  {
    id: 'isaiah-gibson',
    name: 'Isaiah Gibson',
    description: 'Coming Soon',
    isPlaceholder: true,
  }
];

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

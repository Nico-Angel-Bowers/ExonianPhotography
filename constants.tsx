
import { Photographer } from './types';
import { JAZZ_CAFE_IMAGES } from './gallery';

export const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: 'Nico Bowers is a photographer focused on creating calm, intentional images that emphasize atmosphere, composition, and honesty. His work centers on observation and presence rather than spectacle.',
    // Fix: Removed 'works' and 'collections' as they are not in the Photographer interface
    // Fix: Added 'profileImage' and 'portfolios' to comply with the Photographer interface
    profileImage: 'https://i.imgur.com/RYXwCGo.jpeg',
    portfolios: [
      {
        id: 'jazz-cafe',
        title: 'Jazz Cafe collection',
        coverImage: JAZZ_CAFE_IMAGES[0].url,
        images: JAZZ_CAFE_IMAGES
      }
    ],
    isFeatured: true
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: 'Coming Soon',
    // Fix: isPlaceholder is now valid due to types.ts update
    isPlaceholder: true,
  },
  {
    id: 'isaiah-gibson',
    name: 'Isaiah Gibson',
    description: 'Coming Soon',
    // Fix: isPlaceholder is now valid due to types.ts update
    isPlaceholder: true,
  }
];

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

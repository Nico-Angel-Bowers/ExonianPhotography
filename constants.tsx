import { Photographer } from './types';
import { JAZZ_CAFE_IMAGES } from './gallery';

export const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: '',
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
    description: '',
    isPlaceholder: true,
  },
  {
    id: 'isaiah-gibson',
    name: 'Isaiah Gibson',
    description: '',
    isPlaceholder: true,
  }
];

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];
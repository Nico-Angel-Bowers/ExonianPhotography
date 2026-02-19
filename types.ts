
export interface CollectionImage {
  url: string;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  offset: 'none' | 'top' | 'bottom';
}

export interface Portfolio {
  id: string;
  title: string;
  coverImage: string;
  images: CollectionImage[];
}

// Fix: Added isPlaceholder and made profileImage and portfolios optional to support placeholder photographers
export interface Photographer {
  id: string;
  name: string;
  description: string;
  profileImage?: string;
  portfolios?: Portfolio[];
  isFeatured?: boolean;
  isPlaceholder?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}

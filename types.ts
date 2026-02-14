
export interface CollectionImage {
  url: string;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  offset: 'none' | 'top' | 'bottom';
}

export interface Collection {
  name: string;
  images: string[];
}

export interface Photographer {
  id: string;
  name: string;
  description: string;
  isPlaceholder?: boolean;
  profileImage?: string;
  works?: string[];
  collections?: Collection[];
}

export interface NavItem {
  label: string;
  path: string;
}

export interface CreativeItem {
  src: string;
  alt: string;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export const creatives: CreativeItem[];

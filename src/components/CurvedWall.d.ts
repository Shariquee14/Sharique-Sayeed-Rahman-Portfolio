import React from 'react';

export interface CreativeItem {
  src: string;
  alt?: string;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export interface CurvedWallProps {
  items?: CreativeItem[];
  label?: string;
}

export default function CurvedWall(props?: CurvedWallProps): React.JSX.Element;

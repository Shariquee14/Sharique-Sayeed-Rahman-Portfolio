import React from 'react';

export interface CorkboardCardItem {
  id: number | string;
  title: string;
  tag?: string;
  x: number;
  y: number;
  r: number;
  img?: string;
  [key: string]: any;
}

export interface CorkboardGridProps {
  cards?: CorkboardCardItem[];
  heading?: React.ReactNode;
  bgImage?: string;
  onSelect?: (card: CorkboardCardItem) => void;
}

export default function CorkboardGrid(props: CorkboardGridProps): React.JSX.Element;

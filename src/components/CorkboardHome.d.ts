import React from 'react';
import type { CardConfig } from '../data/portfolioData';

export interface CorkboardHomeProps {
  cards: CardConfig[];
  renderFace: (card: CardConfig, active: boolean) => React.ReactNode;
  onOpen?: (card: CardConfig) => void;
  onActive?: (card: CardConfig) => void;
}

export default function CorkboardHome(props: CorkboardHomeProps): React.JSX.Element;

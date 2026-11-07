import React from 'react';

export interface WallBackgroundProps {
  pointerX?: number;
  pointerY?: number;
  scrollX?: number;
  scrollY?: number;
  speed?: number;
  stageWidth?: number;
  stageHeight?: number;
  reduced?: boolean;
}

declare const WallBackground: React.FC<WallBackgroundProps>;
export default WallBackground;

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface DialBackgroundProps {
  activeCardIndex?: number;
  activeCardName?: string;
  activeAngle?: number;
}

export const DialBackground: React.FC<DialBackgroundProps> = ({ 
  activeAngle = 0 
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] h-[340px] pointer-events-none select-none z-0 overflow-hidden flex flex-col items-center justify-start">
      {/* Central Dial Pointer with needle rotation */}
      <div className="flex flex-col items-center justify-center pt-8 sm:pt-6 z-10">
        <motion.div
          animate={
            shouldReduceMotion
              ? { rotate: activeAngle }
              : {
                  rotate: activeAngle,
                  y: [0, -3, 0],
                }
          }
          transition={{
            rotate: { type: 'spring', stiffness: 260, damping: 24 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="text-neutral-900 dark:text-white text-xs sm:text-sm font-bold flex items-center justify-center origin-bottom transition-colors"
        >
          ▲
        </motion.div>
      </div>

      {/* SVG Concentric Arc and Circular Text */}
      <svg
        className="w-[900px] h-[900px] -mt-6 sm:-mt-4 opacity-80 hero-bg-svg"
        viewBox="0 0 900 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="textArcPath"
            d="M 120,450 A 330,330 0 0,1 780,450"
            fill="none"
          />
          <path
            id="outerArcPath"
            d="M 60,450 A 390,390 0 0,1 840,450"
            fill="none"
          />
        </defs>

        {/* Outer subtle ring */}
        <circle
          cx="450"
          cy="450"
          r="420"
          stroke="#d8d8dc"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Mid ring */}
        <circle
          cx="450"
          cy="450"
          r="360"
          stroke="#cfcfd4"
          strokeWidth="1.2"
        />

        {/* Inner ring */}
        <circle
          cx="450"
          cy="450"
          r="300"
          stroke="#d8d8dc"
          strokeWidth="1"
        />

        {/* Small center circle */}
        <circle
          cx="450"
          cy="450"
          r="220"
          stroke="#e0e0e4"
          strokeWidth="1"
          fill="#ececee"
          fillOpacity="0.4"
        />

        {/* Circular text along arc: PORTFOLIO • AI & DATA SCIENCE • SHARIQUE SAYEED RAHMAN */}
        <text className="font-mono text-[10px] tracking-[0.45em] fill-neutral-400 uppercase font-semibold">
          <textPath href="#textArcPath" startOffset="50%" textAnchor="middle">
            • PORTFOLIO • SHARIQUE SAYEED RAHMAN • AI & DATA SCIENCE • 2026 •
          </textPath>
        </text>

        {/* Degree Tick marks around the upper perimeter */}
        {Array.from({ length: 41 }).map((_, i) => {
          const angle = -90 + (i - 20) * 3; // -150 to -30 degrees
          const rad = (angle * Math.PI) / 180;
          const r1 = 360;
          const r2 = i % 5 === 0 ? 372 : 366;
          const x1 = 450 + r1 * Math.cos(rad);
          const y1 = 450 + r1 * Math.sin(rad);
          const x2 = 450 + r2 * Math.cos(rad);
          const y2 = 450 + r2 * Math.sin(rad);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 5 === 0 ? '#99999f' : '#c8c8cc'}
              strokeWidth={i % 5 === 0 ? 1.5 : 1}
            />
          );
        })}
      </svg>
    </div>
  );
};

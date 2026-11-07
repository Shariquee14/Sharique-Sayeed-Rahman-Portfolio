import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CurvedWall from '../CurvedWall';

interface CreativesViewProps {
  onBack: () => void;
  onOpenContact?: () => void;
}

export const CreativesView: React.FC<CreativesViewProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 select-none">
      {/* Top Breadcrumb & Return to Portfolio Deck Button */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-300 dark:border-neutral-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">RETURN TO PORTFOLIO DECK</span>
          <span className="sm:hidden">BACK TO DECK</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-xs text-[#ea3826] font-bold">//</span>
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            CREATIVE SHOWCASE
          </span>
        </div>
      </div>

      {/* Header Title - Centered */}
      <div className="mb-4 text-center">
        <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-neutral-950 dark:text-white uppercase leading-none">
          CREATIVES
        </h1>
      </div>

      {/* Curved 3D Wall */}
      <section className="mx-auto w-full max-w-6xl px-2 md:px-4">
        <CurvedWall />
      </section>
    </div>
  );
};

export default CreativesView;

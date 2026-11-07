import React from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import CurvedWall from '../CurvedWall';

interface CreativesViewProps {
  onBack: () => void;
}

export const CreativesView: React.FC<CreativesViewProps> = ({ onBack }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-[#f8f9fb] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between selection:bg-[#ea3826] selection:text-white transition-colors duration-300">
      {/* 1. INDEPENDENT TOP NAVIGATION BAR */}
      <header className="w-full border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-[#12131a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Return Action & Brand Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono font-bold tracking-wider hover:bg-[#ea3826] dark:hover:bg-[#ea3826] dark:hover:text-white transition-all shadow-sm cursor-pointer"
              title="Return to Work Archive"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO WORK ARCHIVE</span>
            </button>

            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">|</span>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs tracking-wider">
              <span className="text-neutral-400 dark:text-neutral-500 font-semibold">SHARIQUE SAYEED RAHMAN</span>
              <span className="text-[#ea3826] font-bold">//</span>
              <span className="text-neutral-900 dark:text-white font-bold uppercase">CREATIVE PORTFOLIO</span>
            </div>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 hidden md:inline uppercase tracking-widest">
              DEDICATED SHOWCASE
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all cursor-pointer shadow-xs"
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CREATIVES WEBPAGE CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 flex flex-col items-center">
        {/* Header Title - Centered exactly as in reference image */}
        <div className="mb-4 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-neutral-950 dark:text-white uppercase leading-none">
            CREATIVES
          </h1>
        </div>

        {/* Curved 3D Wall */}
        <section className="mx-auto w-full max-w-6xl px-3 md:px-6">
          <CurvedWall />
        </section>
      </main>

      {/* 3. DEDICATED WEBPAGE FOOTER */}
      <footer className="w-full border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#101116] py-5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ea3826]" />
            <span className="font-semibold text-neutral-900 dark:text-white">SHARIQUE SAYEED RAHMAN</span>
            <span>•</span>
            <span>CREATIVE SHOWCASE</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-[#ea3826] font-bold hover:underline cursor-pointer"
            >
              ← RETURN TO WORK ARCHIVE
            </button>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreativesView;

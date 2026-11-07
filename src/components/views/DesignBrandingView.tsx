import React from 'react';
import { ArrowLeft, Sparkles, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

interface DesignBrandingViewProps {
  onBack: () => void;
}

export const DesignBrandingView: React.FC<DesignBrandingViewProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">RETURN TO WORK ARCHIVE</span>
            <span className="sm:hidden">BACK TO ARCHIVE</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-xs text-[#ea3826] font-bold">//</span>
            <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              BRAND IDENTITY
            </span>
          </div>
        </div>
      </div>

      {/* Independent Page Stage */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full bg-white/80 dark:bg-[#18181b]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-md"
      >
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs tracking-widest uppercase mb-2">
          <Sparkles className="w-4 h-4" />
          <span>DEDICATED SECTION</span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl text-neutral-950 dark:text-white tracking-tight">
              Designed and Branding
            </h1>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Illustrator • Figma • Visual Identity Systems &amp; Brand Architecture
            </p>
          </div>
        </div>

        {/* Independent Structure Content Container */}
        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-8 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-center">
            <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-widest font-semibold">
              Design &amp; Branding Page Structure Initialized
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2 font-mono">
              Independent container ready for dedicated layout and design implementation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DesignBrandingView;

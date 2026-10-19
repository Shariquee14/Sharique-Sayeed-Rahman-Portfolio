import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CardInfoDetail {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  categoryNumber?: string;
}

export const CARD_INFO_MAP: Record<string, CardInfoDetail> = {
  me: {
    id: 'me',
    title: 'ABOUT ME',
    description: 'SHARIQUE SAYEED RAHMAN',
    subtitle: 'AI & DATA SCIENCE',
    categoryNumber: 'IDENTITY',
  },
  contact: {
    id: 'contact',
    title: 'CONTACT US',
    description: "Let's connect and start a conversation.",
    subtitle: 'GET IN TOUCH',
    categoryNumber: 'TRANSMISSION',
  },
  projects: {
    id: 'projects',
    title: 'PROJECTS & GITHUB',
    description: 'Explore my projects, repositories, and technical work.',
    subtitle: 'CODE & ARCHITECTURE',
    categoryNumber: 'SYSTEMS',
  },
  sports: {
    id: 'sports',
    title: 'SPORTS & ACHIEVEMENTS',
    description: 'Basketball achievements, tournaments, and extracurricular activities.',
    subtitle: 'ATHLETICS & LEADERSHIP',
    categoryNumber: 'CHAMPIONSHIPS',
  },
  skills: {
    id: 'skills',
    title: 'SKILLS & EDUCATION',
    description: 'My technical skills, academic background, and qualifications.',
    subtitle: 'EXPERTISE & CERTIFICATIONS',
    categoryNumber: 'QUALIFICATIONS',
  },
};

interface ActiveCardInfoProps {
  activeCardId: string | null;
}

export const ActiveCardInfo: React.FC<ActiveCardInfoProps> = ({ activeCardId }) => {
  const currentInfo = activeCardId ? CARD_INFO_MAP[activeCardId] : null;

  return (
    <div
      className="w-full max-w-xl mx-auto px-4 flex flex-col items-center justify-center text-center z-20 relative select-none pointer-events-none min-h-[64px]"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {currentInfo && (
          <motion.div
            key={currentInfo.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-1"
          >
            {/* Top micro category indicator with red accent */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-neutral-500 dark:text-neutral-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea3826] inline-block" />
              <span>{currentInfo.categoryNumber || currentInfo.subtitle}</span>
              <span className="text-neutral-300 dark:text-neutral-600">/</span>
              <span className="text-neutral-400 dark:text-neutral-400 font-semibold">{currentInfo.subtitle}</span>
            </div>

            {/* Dedicated Centered Title */}
            <h3 className="font-heading font-black text-base sm:text-lg md:text-xl tracking-[0.14em] text-neutral-950 dark:text-white uppercase">
              {currentInfo.title}
            </h3>

            {/* Description line */}
            <p className="text-xs sm:text-sm font-sans font-medium text-neutral-600 dark:text-neutral-300 max-w-md tracking-tight">
              {currentInfo.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

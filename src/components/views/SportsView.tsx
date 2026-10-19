import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Trophy, Medal, Flame, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';

interface SportsViewProps {
  onBack: () => void;
}

export const SportsView: React.FC<SportsViewProps> = ({ onBack }) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ea3826', '#f59e0b', '#121212', '#ffffff'],
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800">
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
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase">ATHLETICS & LEADERSHIP</span>
        </div>
      </div>

      {/* Hero Banner: 1:1 Athletic Excellence */}
      <div className="bg-neutral-900 dark:bg-[#18181b] text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden border border-neutral-800">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ea3826] tracking-widest uppercase mb-2">
            <Flame className="w-4 h-4" />
            <span>DISCIPLINE & HIGH-PRESSURE PERFORMANCE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight uppercase">
            5X BASKETBALL GOLD CHAMPION & DISTRICT ATHLETE.
          </h2>

          <p className="mt-4 text-neutral-300 text-sm sm:text-base font-sans leading-relaxed">
            Athletics taught me how to read floor geometry under intense clocks, make rapid tactical decisions, and execute cross-functional teamwork when the game is on the line. The same discipline directly translates into building resilient software architecture and leading technical teams.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>5 Gold Championships</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Back-to-Back Regional ASISC ('17, '18)</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ea3826]" />
              <span>District Multi-Sport Rep</span>
            </div>
          </div>
        </div>

        {/* Court arc graphic watermark in background */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full stroke-white fill-none stroke-[2]">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="30" />
            <line x1="0" y1="100" x2="200" y2="100" />
          </svg>
        </div>
      </div>

      {/* Grid of Verified Tournament Victories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            onClick={triggerConfetti}
            className="bg-white dark:bg-[#1f1f23] rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-[#ea3826]/40 dark:hover:border-[#ea3826]/40 transition-all cursor-pointer relative group flex flex-col justify-between"
          >
            <div>
              {/* Badge & Year */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 font-mono text-[10px] font-bold">
                  <Medal className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>{ach.highlight}</span>
                </span>
                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-semibold">
                  {ach.year || 'VICTORY'}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-lg text-neutral-950 dark:text-white group-hover:text-[#ea3826] transition-colors leading-snug">
                {ach.title}
              </h3>

              {/* Organizer / Region */}
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1 mb-3">
                {ach.organizerOrRegion}
              </div>

              {/* Description from resume */}
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                {ach.description}
              </p>
            </div>

            {/* Click to Celebrate */}
            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ea3826]" />
              </span>
              <span>GOLD #0{idx + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Athletic Leadership Takeaway Card */}
      <div className="mt-8 bg-neutral-100 dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-8 border border-neutral-300/80 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h4 className="font-heading font-bold text-lg text-neutral-950 dark:text-white">
            How Sports Excellence Influences My Engineering
          </h4>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
            In competitive basketball and tournament play, seconds matter, and individual ego takes second place to court spacing and team synergy. I apply this exact mindset to modern software engineering: concise asynchronous communication, zero panic under deadlines, and rigorous execution.
          </p>
        </div>

        <button
          onClick={triggerConfetti}
          className="shrink-0 px-5 py-3 rounded-xl bg-neutral-950 dark:bg-white hover:bg-[#ea3826] dark:hover:bg-[#ea3826] text-white dark:text-neutral-950 dark:hover:text-white font-mono text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>FIRE VICTORY CONFETTI</span>
        </button>
      </div>
    </div>
  );
};

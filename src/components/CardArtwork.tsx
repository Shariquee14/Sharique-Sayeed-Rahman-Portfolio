import React from 'react';
import type { CardConfig } from '../data/portfolioData';
import { Sparkles, ArrowUpRight, Terminal, Trophy, Cpu } from 'lucide-react';

interface CardArtworkProps {
  card: CardConfig;
  isHovered: boolean;
}

export const CardArtwork: React.FC<CardArtworkProps> = ({ card, isHovered }) => {
  switch (card.cardTheme) {
    case 'dark-cosmic': // Card 1: PROJECTS
      return (
        <div className="w-full h-full bg-[#111216] text-white flex flex-col justify-between p-4 sm:p-5 relative overflow-hidden select-none">
          {/* Top meta */}
          <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-400 z-10">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>Github</span>
            </span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] text-cyan-300">
              REPOS
            </span>
          </div>

          {/* Glowing Cosmic / Neural Singularity Vortex inspired by reference */}
          <div className="relative flex items-center justify-center my-auto py-2">
            {/* Outer cyan aura */}
            <div 
              className={`absolute w-36 h-36 rounded-full bg-cyan-500/20 blur-xl transition-all duration-700 ${
                isHovered ? 'scale-125 opacity-100 bg-cyan-400/30' : 'scale-100 opacity-60'
              }`} 
            />
            
            {/* Swirling celestial vortex rings */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <div 
                className="absolute inset-1 rounded-full border border-blue-400/40 animate-spin-slow"
                style={{ animationDuration: '24s' }}
              />
              <div 
                className="absolute inset-3 rounded-full border border-dashed border-cyan-300/60 animate-spin-slow" 
                style={{ animationDuration: '14s', animationDirection: 'reverse' }}
              />
              
              {/* Glowing core sphere */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-radial from-white via-cyan-300 to-blue-700 shadow-[0_0_25px_rgba(34,211,238,0.8)] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_15px_#fff]" />
              </div>
            </div>
          </div>

          {/* Bottom typography & bar code */}
          <div className="z-10 flex flex-col gap-1 border-t border-white/10 pt-2.5">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-xs sm:text-sm tracking-wider text-white">
                PROJECTS
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400">
              <span>Github</span>
              <span className="tracking-tighter">|||| || | |||</span>
            </div>
          </div>
        </div>
      );

    case 'red-accent': // Card 2: CONTACT
      return (
        <div className="w-full h-full bg-[#ea3826] text-white flex flex-col justify-between p-4 sm:p-5 relative overflow-hidden select-none">
          {/* Top meta */}
          <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-900/70 z-10 font-bold">
            <span className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
          </div>

          {/* Graphic from reference: stylized 4-lobed eye clover symbol */}
          <div className="my-auto flex flex-col items-center justify-center py-2">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer pulse ring on hover */}
              <div
                className={`absolute w-24 h-24 rounded-full border-2 border-neutral-950/30 transition-all duration-500 ${
                  isHovered ? 'scale-110 opacity-60' : 'scale-100 opacity-30'
                }`}
              />

              {/* Phone handset SVG */}
              <svg
                viewBox="0 0 100 100"
                fill="none"
                className={`w-20 h-20 transition-transform duration-500 ${
                  isHovered ? 'scale-110 -rotate-12' : 'scale-100 rotate-0'
                }`}
              >
                {/* Handset body — bold rounded path */}
                <path
                  d="M28 18 C24 18 20 22 20 26 C20 62 38 80 74 80 C78 80 82 76 82 72 L82 60 C82 56 79 53 75 53 L65 53 C62 53 60 55 59 57 L56 63 C48 59 41 52 37 44 L43 41 C45 40 47 38 47 35 L47 25 C47 21 44 18 40 18 Z"
                  fill="#121212"
                  strokeLinejoin="round"
                />
                {/* Red accent circle — signal dot */}
                <circle cx="72" cy="26" r="10" fill="#ea3826" />
                <circle cx="72" cy="26" r="5"  fill="#121212" />
              </svg>
            </div>
          </div>

          {/* Bottom typography */}
          <div className="z-10 flex flex-col gap-1 border-t border-black/20 pt-2.5">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-xs sm:text-sm tracking-wider text-neutral-950">
                CONTACT US
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950" />
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-neutral-950/80 font-medium">
              <span>START CONVERSATION</span>
              <span>DIRECT</span>
            </div>
          </div>
        </div>
      );

    case 'portrait-center': // Card 3: ME (Central anchor)
      return (
        <div className="w-full h-full bg-[#161618] text-white flex flex-col justify-between relative overflow-hidden select-none">
          {/* Portrait Image */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <img
              src="/assets/portrait.jpg"
              alt="Sharique Sayeed Rahman"
              className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              style={{
                filter: 'contrast(1.08) brightness(0.96)',
              }}
            />
            {/* Top and Bottom gradient overlays for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/40" />
          </div>

          {/* Top micro badges */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between z-10">
            <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-200 border border-white/20">
              ME // ANCHOR
            </span>
          </div>

          {/* Bottom identity tag */}
          <div className="p-3.5 sm:p-4 z-10 flex flex-col gap-0.5">
            {/* Role header */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea3826]" />
              <span className="text-[7.5px] font-mono tracking-[0.18em] text-neutral-400 uppercase">
                AI &amp; Data Science
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-xs sm:text-sm tracking-wide text-white uppercase drop-shadow-md">
                SHARIQUE S. RAHMAN
              </span>
              <span className="w-2 h-2 rounded-full bg-[#ea3826]" />
            </div>
            <div className="flex items-center justify-end text-[8px] font-mono text-neutral-300">
              <span className="text-[#ea3826] font-semibold">ABOUT ME</span>
            </div>
          </div>
        </div>
      );

    case 'white-athletic': // Card 4: SPORTS & ACHIEVEMENTS
      return (
        <div className="w-full h-full bg-[#f8f8fa] text-neutral-900 flex flex-col justify-between p-4 sm:p-5 relative overflow-hidden select-none border border-neutral-200">
          {/* Top meta */}
          <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-500 z-10">
            <span className="flex items-center gap-1 font-bold text-neutral-900">
              <Trophy className="w-3 h-3 text-[#ea3826]" />
              <span>ATHLETICS</span>
            </span>
            <Sparkles className="w-3 h-3 text-neutral-400" />
          </div>

          {/* Center athletic / speed artwork inspired by 1:1 Polestar card in reference */}
          <div className="my-auto flex flex-col items-center justify-center py-1">
            {/* Bold 1:1 display typography */}
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-neutral-950">
                1:1
              </span>
              <span className="font-mono text-[9px] font-bold px-1 py-0.5 bg-neutral-950 text-white rounded">
                GOLD
              </span>
            </div>

            {/* Basketball arc graphic & speed geometry */}
            <div className="relative w-28 h-14 mt-1 flex items-center justify-center">
              {/* Court keyline & trajectory arc */}
              <svg viewBox="0 0 120 60" className="w-full h-full">
                <path
                  d="M 10 50 Q 60 5 110 50"
                  fill="none"
                  stroke="#ea3826"
                  strokeWidth="2.5"
                  strokeDasharray="2 3"
                />
                <circle cx="60" cy="27" r="14" fill="none" stroke="#121212" strokeWidth="1.5" />
                <line x1="60" y1="13" x2="60" y2="41" stroke="#121212" strokeWidth="1.5" />
                <circle cx="100" cy="46" r="4" fill="#ea3826" />
              </svg>
            </div>

            <span className="text-[8px] font-mono font-bold tracking-widest text-neutral-600 uppercase mt-1">
              5X BASKETBALL CHAMPION
            </span>
          </div>

          {/* Bottom typography */}
          <div className="z-10 flex flex-col gap-1 border-t border-neutral-300 pt-2.5">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-xs sm:text-sm tracking-wider text-neutral-950">
                ACHIEVEMENTS
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950" />
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500">
              <span>REGIONAL ASISC & TATA</span>
              <span>CHAMPION</span>
            </div>
          </div>
        </div>
      );

    case 'dark-ornate': // Card 5: SKILLS & EDUCATION
      return (
        <div className="w-full h-full bg-[#121316] text-white flex flex-col justify-between p-4 sm:p-5 relative overflow-hidden select-none">
          {/* Top meta */}
          <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-400 z-10">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-[#ea3826]" />
              <span>SKILLS</span>
            </span>
            <span className="font-serif text-xs text-[#ea3826]">♠</span>
          </div>

          {/* Ornate technical playing-card graphic inspired by 007 / Casino card in reference */}
          <div className="my-auto flex flex-col items-center justify-center py-1">
            <div className="relative w-24 h-24 sm:w-26 sm:h-26 flex items-center justify-center">
              {/* Ornate filigree ring with spade lace */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="38" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
                <circle cx="50" cy="50" r="26" stroke="#ea3826" strokeWidth="1" strokeOpacity="0.6" />
                
                {/* Tech matrix crosshairs */}
                <line x1="50" y1="12" x2="50" y2="88" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
                <line x1="12" y1="50" x2="88" y2="50" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
                
                {/* Central AI core symbol */}
                <circle cx="50" cy="50" r="10" fill="#ea3826" />
                <circle cx="50" cy="50" r="5" fill="#ffffff" />
              </svg>

              <span className="absolute font-mono text-[9px] font-black text-white/90">
                2026
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[7.5px] font-mono tracking-widest text-neutral-400">
                PYTHON • SQL • GENAI
              </span>
            </div>
          </div>

          {/* Bottom typography */}
          <div className="z-10 flex flex-col gap-1 border-t border-white/10 pt-2.5">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-xs sm:text-sm tracking-wider text-white">
                EDUCATION & SKILLS
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300" />
            </div>
            <div className="flex items-center justify-end text-[8px] font-mono text-neutral-400">
              <span className="text-neutral-500 font-serif">007</span>
            </div>
          </div>
        </div>
      );
  }
};

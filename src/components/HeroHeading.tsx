import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroHeadingProps {
  onPrev?: () => void;
  onNext?: () => void;
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({ onPrev, onNext }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center pt-2 sm:pt-4 pb-2 select-none z-10">
      {/* Subtle grid crosshairs matching the reference */}
      <div className="absolute -top-4 left-6 sm:left-12 text-neutral-400 dark:text-neutral-600 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute -top-4 right-6 sm:right-12 text-neutral-400 dark:text-neutral-600 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute top-1/2 -left-2 text-neutral-400 dark:text-neutral-600 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute top-1/2 -right-2 text-neutral-400 dark:text-neutral-600 font-mono text-xs select-none pointer-events-none">+</div>

      {/* The Central Red Rectangular Accent Block */}
      <div className="relative w-full flex items-center justify-center">
        {/* Tall Red Rectangle behind the central letters RTF with subtle breathing motion */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { scaleY: 1, opacity: 1 }
              : {
                  scaleY: [1, 1.04, 0.98, 1.03, 1],
                  y: [0, -3, 1, -2, 0],
                  opacity: [0.95, 1, 0.95, 1, 0.95],
                }
          }
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute z-0 w-20 sm:w-28 md:w-36 h-40 sm:h-52 md:h-64 bg-[#ea3826] rounded-xs shadow-md"
          style={{ transformOrigin: 'top center' }}
        />

        {/* Outer container for the layered PORTFOLIO typography */}
        <div className="relative z-10 flex items-center justify-center w-full px-2">
          {/* Left Arrow Icon ▶ (Interactive card cycle control) */}
          <motion.button
            onClick={onPrev}
            whileHover={{ scale: 1.25, x: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous card in deck"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, -3, 0],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="hidden sm:inline-flex items-center justify-center mr-3 md:mr-6 text-neutral-900 dark:text-white text-xs sm:text-sm select-none cursor-pointer p-2 rounded-full hover:bg-neutral-300/50 dark:hover:bg-neutral-800/60 transition-colors"
            title="Rotate deck counter-clockwise"
          >
            ◀
          </motion.button>

          {/* Layered Typography Stack with synchronized seamless merge/fusion animation */}
          <div className="relative grid grid-cols-1 grid-rows-1 place-items-center py-3 sm:py-6 md:py-8">
            {/* Top Solid Black Heading — begins separated above, converges smoothly, fuses completely at center, holds, separates */}
            <motion.h1
              initial={{ y: '-36%', opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { y: '0%', opacity: 1 }
                  : {
                      y: ['-36%', '-36%', '0%', '0%', '-36%', '-36%'],
                      opacity: 1,
                    }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                times: [0, 0.15, 0.45, 0.60, 0.90, 1],
                ease: 'easeInOut',
              }}
              className="col-start-1 row-start-1 font-display font-black tracking-tight text-[44px] xs:text-[52px] sm:text-[88px] md:text-[120px] lg:text-[142px] leading-[0.82] text-neutral-950 dark:text-white uppercase text-center transition-colors z-10"
              style={{
                letterSpacing: '-0.02em',
              }}
            >
              SHARIQUE
            </motion.h1>

            {/* Bottom Hollow Outlined Heading — begins separated below, converges smoothly, fuses completely at center, holds, separates */}
            <motion.div
              initial={{ y: '36%', opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { y: '0%', opacity: 1 }
                  : {
                      y: ['36%', '36%', '0%', '0%', '36%', '36%'],
                      opacity: [0.85, 0.85, 1, 1, 0.85, 0.85],
                    }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                times: [0, 0.15, 0.45, 0.60, 0.90, 1],
                ease: 'easeInOut',
              }}
              className="col-start-1 row-start-1 stroke-text font-display font-black tracking-tight text-[44px] xs:text-[52px] sm:text-[88px] md:text-[120px] lg:text-[142px] leading-[0.82] uppercase text-center select-none pointer-events-none transition-colors z-20"
              style={{
                letterSpacing: '-0.02em',
              }}
            >
              SHARIQUE
            </motion.div>
          </div>

          {/* Right Arrow Icon ▶ (Interactive card cycle control) */}
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.25, x: 3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next card in deck"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, 3, 0],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="hidden sm:inline-flex items-center justify-center ml-3 md:mr-6 text-neutral-900 dark:text-white text-xs sm:text-sm select-none cursor-pointer p-2 rounded-full hover:bg-neutral-300/50 dark:hover:bg-neutral-800/60 transition-colors"
            title="Rotate deck clockwise"
          >
            ▶
          </motion.button>
        </div>

        {/* Character & Stationary Shadow Overlay (In FRONT of SHARIQUE text) */}
        {/*
          PNG canvas: 819×1024 px
          Visible character bounds: minX=274, maxX=521, minY=44, maxY=888
          Visible size: 247×844 px

          Per breakpoint (clipping wrapper = visible char dimensions, img positioned to crop transparent padding):
          Mobile : fullH=188px, clipW=45px,  clipH=155px, top=-8px,  left=-50px
          sm     : fullH=243px, clipW=59px,  clipH=200px, top=-10px, left=-65px
          md     : fullH=322px, clipW=78px,  clipH=265px, top=-14px, left=-86px
        */}
        <div
          aria-hidden="true"
          className="absolute z-20 w-20 sm:w-28 md:w-36 h-40 sm:h-52 md:h-64 pointer-events-none flex flex-col items-center justify-end pb-1.5 sm:pb-2 md:pb-2.5"
        >
          {/* Floating Character (only this element animates) */}
          <motion.div
            animate={
              shouldReduceMotion
                ? { y: 0 }
                : { y: [-4, 4, -4] }
            }
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex items-end justify-center"
          >
            {/* Clipping wrapper — sized to visible character only, hides transparent PNG padding */}
            <div
              className="char-clip relative overflow-hidden select-none pointer-events-none"
              style={{ width: 45, height: 155 }}
            >
              <img
                src="/assets/hero_character.png"
                alt="Sharique Sayeed Rahman"
                className="absolute select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.30)]"
                style={{ height: 188, width: 'auto', top: -8, left: -50 }}
              />
              {/* Responsive breakpoint overrides for clipping wrapper + image */}
              <style>{`
                @media (min-width: 640px) {
                  .char-clip { width: 59px !important; height: 200px !important; }
                  .char-clip img { height: 243px !important; top: -10px !important; left: -65px !important; }
                }
                @media (min-width: 768px) {
                  .char-clip { width: 78px !important; height: 265px !important; }
                  .char-clip img { height: 322px !important; top: -14px !important; left: -86px !important; }
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Micro-editorial metadata line beneath heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-4xl px-4 sm:px-8 mt-2.5 sm:mt-3 relative z-30 flex items-center justify-center sm:justify-start text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-700 dark:text-neutral-400 uppercase transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 dark:text-neutral-400 select-none font-bold">+</span>
          <span className="font-semibold text-neutral-950 dark:text-neutral-100 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            SHARIQUE SAYEED RAHMAN
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 select-none font-bold">+</span>
        </div>
      </motion.div>
    </div>
  );
};

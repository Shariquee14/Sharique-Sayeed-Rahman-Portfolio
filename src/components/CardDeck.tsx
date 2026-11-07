import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HERO_CARDS } from '../data/portfolioData';
import { CardArtwork } from './CardArtwork';

interface CardDeckProps {
  onHoverCard: (cardName: string, angle: number, cardId?: string) => void;
  activeAngle?: number;
}

// Base angles for the 7 cards around the elliptical arc
// Card 0: Edits (-50°), Card 1: Projects (-33°), Card 2: Contact (-16°), Card 3: Me (0°), Card 4: Sports (+16°), Card 5: Skills (+33°), Card 6: YouTube (+50°)
const BASE_ANGLES = [-50, -33, -16, 0, 16, 33, 50];
const MOBILE_ANGLES = [0, -16, -33, -50, 16, 33, 50];

export const CardDeck: React.FC<CardDeckProps> = ({ onHoverCard }) => {
  const navigate = useNavigate();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const shouldReduceMotion = useReducedMotion();

  // Responsive window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive orbital geometry with expanded spacing
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Strictly Mobile-Only card display order: About Me first, followed by remaining cards in their existing sequence
  const MOBILE_HERO_CARDS = [
    HERO_CARDS.find((c) => c.id === 'me')!,
    (HERO_CARDS.find((c) => c.id === 'creatives') || HERO_CARDS.find((c) => c.id === 'edits'))!,
    HERO_CARDS.find((c) => c.id === 'projects')!,
    HERO_CARDS.find((c) => c.id === 'contact')!,
    HERO_CARDS.find((c) => c.id === 'sports')!,
    HERO_CARDS.find((c) => c.id === 'skills')!,
    HERO_CARDS.find((c) => c.id === 'youtube')!,
  ];

  const activeCards = isMobile ? MOBILE_HERO_CARDS : HERO_CARDS;

  // Expanded radiusX ensures cards breathe and titles never get covered
  // Mobile uses viewport-aware radius to prevent edge overflow on narrow screens
  const radiusX = isMobile ? Math.min(160, Math.max(125, (windowWidth - 48) * 0.42)) : isTablet ? 440 : 580;
  const radiusY = isMobile ? 32 : isTablet ? 54 : 72;
  const cardScaleBase = isMobile ? 0.72 : isTablet ? 0.84 : 0.96;

  const swayAmplitude = isMobile ? 2.5 : 4.0; // subtle, steady orbital sway

  // Mobile sequential animation index: starts at 0 (About Me card first)
  const [mobileSeqIndex, setMobileSeqIndex] = useState<number>(0);

  // Mobile sequential card cycling timer (cycles through 7 cards with foreground pause)
  useEffect(() => {
    if (!isMobile || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setMobileSeqIndex((prev) => (prev + 1) % activeCards.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [isMobile, shouldReduceMotion, activeCards.length]);

  // Synchronize active card text and needle with mobile sequential card
  useEffect(() => {
    if (!isMobile) return;
    const currentCard = activeCards[mobileSeqIndex];
    if (currentCard) {
      const angle = isMobile ? MOBILE_ANGLES[mobileSeqIndex] : BASE_ANGLES[mobileSeqIndex];
      onHoverCard(currentCard.title, angle * 0.55, currentCard.id);
    }
  }, [isMobile, mobileSeqIndex, onHoverCard, activeCards]);

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe right -> previous card in sequence
        setMobileSeqIndex((prev) => (prev - 1 + activeCards.length) % activeCards.length);
      } else {
        // Swipe left -> next card in sequence
        setMobileSeqIndex((prev) => (prev + 1) % activeCards.length);
      }
    }
    touchStartXRef.current = null;
  };

  // Compute 3D elliptical coordinates at a given angle (Desktop)
  const getOrbitalCoordinates = (angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const x = radiusX * Math.sin(rad);
    const y = radiusY * (1 - Math.cos(rad));
    const z = -100 * (1 - Math.cos(rad));
    const scale = cardScaleBase * (1 - 0.12 * (1 - Math.cos(rad)));
    const rotateZ = angleDeg * 0.46; // restrained rotation keeps cards upright and readable
    const rotateY = -angleDeg * 0.20;

    return { x, y, z, scale, rotateZ, rotateY };
  };

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  // Mobile layout spacing and natural background fan slots (7 cards in MOBILE_HERO_CARDS order)
  // Index 0: About (Me) at center, followed by remaining cards fanning outward
  const mobileSpread = Math.min(50, Math.max(38, (windowWidth - 48) * 0.14));
  const mobileHomeSlots = [
    { x: 0,                 y: 2,  scale: 0.78, rotateZ: 0,   brightness: 'brightness-[0.96]' }, // Index 0: About (Me)
    { x: -mobileSpread,     y: 8,  scale: 0.74, rotateZ: -6,  brightness: 'brightness-[0.94]' }, // Index 1: Edits
    { x: -mobileSpread * 2, y: 15, scale: 0.68, rotateZ: -12, brightness: 'brightness-[0.88]' }, // Index 2: Projects
    { x: -mobileSpread * 3, y: 22, scale: 0.62, rotateZ: -18, brightness: 'brightness-[0.82]' }, // Index 3: Contact Us
    { x: mobileSpread,      y: 8,  scale: 0.74, rotateZ: 6,   brightness: 'brightness-[0.94]' }, // Index 4: Achievements
    { x: mobileSpread * 2,  y: 15, scale: 0.68, rotateZ: 12,  brightness: 'brightness-[0.88]' }, // Index 5: Skills
    { x: mobileSpread * 3,  y: 22, scale: 0.62, rotateZ: 18,  brightness: 'brightness-[0.82]' }, // Index 6: YouTube
  ];

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full max-w-7xl mx-auto h-[400px] sm:h-[460px] md:h-[500px] flex items-end justify-center pb-2 sm:pb-4 select-none ${
        isMobile ? 'overflow-hidden' : 'perspective-deck'
      }`}
    >
      <div 
        style={{ transformStyle: isMobile ? 'flat' : 'preserve-3d' }}
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
      >
        {activeCards.map((card, index) => {
          const isHovered = hoveredCardId === card.id;
          const isMobileActive = isMobile && mobileSeqIndex === index;
          const baseAngle = BASE_ANGLES[index];

          // Compute orbital sway keyframes for desktop
          const pNeutral = getOrbitalCoordinates(baseAngle);
          const pRight = getOrbitalCoordinates(baseAngle + swayAmplitude);
          const pLeft = getOrbitalCoordinates(baseAngle - swayAmplitude);

          // Subtle staggered floating breathing offset (Desktop)
          const floatOffset = [0, -4, 0, 4, 0, -4, 0];

          // Z-index: On mobile, active foreground card is strictly on top (70).
          // Background cards follow the sequential order behind it.
          // On desktop: center portrait (index 3) is 40, adjacent 30, outer 20, outermost 10, hover is 100.
          const baseZDesktop = index === 3 ? 40 : index === 2 || index === 4 ? 30 : index === 1 || index === 5 ? 20 : 10;
          const zIndex = isMobile
            ? isMobileActive
              ? 70
              : 60 - ((index - mobileSeqIndex + activeCards.length) % activeCards.length) * 7
            : isHovered
              ? 100
              : baseZDesktop;

          return (
            /* OUTER WRAPPER: Handles Position & Stacking Order */
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card.route)}
              onMouseEnter={() => {
                if (!isMobile) {
                  setHoveredCardId(card.id);
                  onHoverCard(card.title, baseAngle * 0.55, card.id);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredCardId(null);
                  onHoverCard('ME', 0, undefined);
                }
              }}
              onFocus={() => {
                if (!isMobile) {
                  setHoveredCardId(card.id);
                  onHoverCard(card.title, baseAngle * 0.55, card.id);
                }
              }}
              onBlur={() => {
                if (!isMobile) {
                  setHoveredCardId(null);
                  onHoverCard('ME', 0, undefined);
                }
              }}
              animate={
                isMobile
                  ? isMobileActive
                    ? {
                        x: 0,
                        y: -18,
                        scale: 0.96,
                        rotateZ: 0,
                        rotateY: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 220,
                          damping: 26,
                          mass: 0.8,
                        },
                      }
                    : {
                        x: mobileHomeSlots[index].x,
                        y: mobileHomeSlots[index].y,
                        scale: mobileHomeSlots[index].scale,
                        rotateZ: mobileHomeSlots[index].rotateZ,
                        rotateY: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 220,
                          damping: 26,
                          mass: 0.8,
                        },
                      }
                  : shouldReduceMotion
                    ? {
                        x: pNeutral.x,
                        y: pNeutral.y,
                        scale: pNeutral.scale,
                        rotateZ: pNeutral.rotateZ,
                        rotateY: pNeutral.rotateY,
                      }
                    : {
                        x: [pNeutral.x, pRight.x, pNeutral.x, pLeft.x, pNeutral.x],
                        y: [
                          pNeutral.y + floatOffset[index],
                          pRight.y + floatOffset[(index + 1) % 7],
                          pNeutral.y + floatOffset[index],
                          pLeft.y + floatOffset[(index + 2) % 7],
                          pNeutral.y + floatOffset[index],
                        ],
                        scale: [
                          pNeutral.scale,
                          pRight.scale,
                          pNeutral.scale,
                          pLeft.scale,
                          pNeutral.scale,
                        ],
                        rotateZ: [
                          pNeutral.rotateZ,
                          pRight.rotateZ,
                          pNeutral.rotateZ,
                          pLeft.rotateZ,
                          pNeutral.rotateZ,
                        ],
                        rotateY: [
                          pNeutral.rotateY,
                          pRight.rotateY,
                          pNeutral.rotateY,
                          pLeft.rotateY,
                          pNeutral.rotateY,
                        ],
                        transition: {
                          duration: 8.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.3,
                        },
                      }
              }
              style={{
                position: 'absolute',
                transformOrigin: 'bottom center',
                zIndex,
                pointerEvents: 'auto',
              }}
              className="cursor-pointer group focus:outline-hidden"
              tabIndex={0}
              role="button"
              aria-label={`Open ${card.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(card.route);
                }
              }}
            >
              {/* INNER CARD ELEMENT: Solid opaque surface with independent shadow and elevation */}
              <motion.div
                animate={
                  isMobile
                    ? {
                        y: isMobileActive ? -6 : 0,
                        scale: isMobileActive ? 1.02 : 1.0,
                      }
                    : {
                        y: isHovered ? -32 : 0,
                        scale: isHovered ? 1.08 : 1.0,
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 26,
                  mass: 0.8,
                }}
                className={`w-[170px] sm:w-[195px] md:w-[205px] h-[260px] sm:h-[285px] md:h-[305px] rounded-2xl md:rounded-3xl overflow-hidden card-rim transition-all duration-300 relative isolate bg-neutral-900 dark:bg-neutral-950 ${
                  isMobile
                    ? isMobileActive
                      ? 'shadow-[0_22px_45px_-8px_rgba(0,0,0,0.65),0_0_22px_rgba(234,56,38,0.25)] ring-2 ring-[#ea3826] filter brightness-100 opacity-100'
                      : `shadow-[0_10px_20px_-6px_rgba(0,0,0,0.35)] ring-1 ring-black/15 dark:ring-white/10 opacity-100 filter ${mobileHomeSlots[index].brightness}`
                    : isHovered
                      ? 'shadow-[0_28px_55px_-10px_rgba(0,0,0,0.4),0_0_25px_rgba(234,56,38,0.2)] ring-2 ring-neutral-900/90 dark:ring-white/80'
                      : 'shadow-[0_16px_32px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/10 dark:ring-white/10'
                }`}
              >
                {/* Specific Card Visual Artwork */}
                <CardArtwork card={card} isHovered={isMobile ? isMobileActive : isHovered} />

                {/* Subtle glass gloss highlight overlay */}
                <div className="absolute inset-0 card-sheen pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
              </motion.div>

              {/* Minimal floating category indicator on hover / active */}
              <motion.div
                animate={{
                  opacity: isMobile ? (isMobileActive ? 1 : 0) : (isHovered ? 1 : 0),
                  y: isMobile ? (isMobileActive ? 6 : 0) : (isHovered ? 8 : 0),
                }}
                transition={{ duration: 0.2 }}
                className="text-center mt-2 pointer-events-none"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-mono text-[9px] tracking-wider uppercase shadow-md">
                  CLICK TO VIEW {card.badge}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


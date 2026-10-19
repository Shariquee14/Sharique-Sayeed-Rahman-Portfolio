import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HERO_CARDS } from '../data/portfolioData';
import { CardArtwork } from './CardArtwork';

interface CardDeckProps {
  onHoverCard: (cardName: string, angle: number, cardId?: string) => void;
  activeAngle?: number;
}

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

  // Expanded radiusX ensures cards breathe and titles never get covered
  // Mobile uses viewport-aware radius to prevent edge overflow on narrow screens
  const radiusX = isMobile ? Math.min(160, Math.max(125, (windowWidth - 48) * 0.42)) : isTablet ? 380 : 520;
  const radiusY = isMobile ? 32 : isTablet ? 50 : 66;
  const cardScaleBase = isMobile ? 0.75 : isTablet ? 0.88 : 1.0;

  // Base angles for the 5 cards around the elliptical arc
  // Card 0: Projects (-46°), Card 1: Contact (-23°), Card 2: Me (0°), Card 3: Sports (+23°), Card 4: Skills (+46°)
  const baseAngles = [-46, -23, 0, 23, 46];
  const swayAmplitude = isMobile ? 3.0 : 4.8; // subtle, steady orbital sway

  // Mobile sequential animation index (Projects -> Contact Us -> About -> Achievements -> Skills)
  const [mobileSeqIndex, setMobileSeqIndex] = useState<number>(0);

  // Mobile sequential card cycling timer (cycles through 5 cards with foreground pause)
  useEffect(() => {
    if (!isMobile || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setMobileSeqIndex((prev) => (prev + 1) % HERO_CARDS.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [isMobile, shouldReduceMotion]);

  // Synchronize active card text and needle with mobile sequential card
  useEffect(() => {
    if (!isMobile) return;
    const currentCard = HERO_CARDS[mobileSeqIndex];
    if (currentCard) {
      onHoverCard(currentCard.title, baseAngles[mobileSeqIndex] * 0.55, currentCard.id);
    }
  }, [isMobile, mobileSeqIndex, onHoverCard]);

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
        setMobileSeqIndex((prev) => (prev - 1 + HERO_CARDS.length) % HERO_CARDS.length);
      } else {
        // Swipe left -> next card in sequence
        setMobileSeqIndex((prev) => (prev + 1) % HERO_CARDS.length);
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
    const rotateZ = angleDeg * 0.48; // restrained rotation keeps cards upright and readable
    const rotateY = -angleDeg * 0.22;

    return { x, y, z, scale, rotateZ, rotateY };
  };

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  // Mobile navigation row items (exact 5 destinations)
  const MOBILE_NAV_ITEMS = [
    { label: 'Projects', route: '/projects', id: 'projects', index: 0 },
    { label: 'Contact Us', route: '/contact', id: 'contact', index: 1 },
    { label: 'About', route: '/about', id: 'me', index: 2 },
    { label: 'Achievements', route: '/achievements', id: 'sports', index: 3 },
    { label: 'Skills', route: '/skills-education', id: 'skills', index: 4 },
  ];

  // Mobile layout spacing and natural background fan slots
  const mobileSpread = Math.min(68, Math.max(54, (windowWidth - 48) * 0.18));
  const mobileHomeSlots = [
    { x: -mobileSpread * 2, y: 16, scale: 0.68, rotateZ: -14, zIndex: 10, brightness: 'brightness-[0.88]' }, // Projects
    { x: -mobileSpread,     y: 8,  scale: 0.74, rotateZ: -7,  zIndex: 20, brightness: 'brightness-[0.94]' }, // Contact Us
    { x: 0,                 y: 2,  scale: 0.78, rotateZ: 0,   zIndex: 25, brightness: 'brightness-[0.94]' }, // About
    { x: mobileSpread,      y: 8,  scale: 0.74, rotateZ: 7,   zIndex: 20, brightness: 'brightness-[0.94]' }, // Achievements
    { x: mobileSpread * 2,  y: 16, scale: 0.68, rotateZ: 14,  zIndex: 10, brightness: 'brightness-[0.88]' }, // Skills
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
        {HERO_CARDS.map((card, index) => {
          const isHovered = hoveredCardId === card.id;
          const isMobileActive = isMobile && mobileSeqIndex === index;
          const baseAngle = baseAngles[index];

          // Compute orbital sway keyframes for desktop
          const pNeutral = getOrbitalCoordinates(baseAngle);
          const pRight = getOrbitalCoordinates(baseAngle + swayAmplitude);
          const pLeft = getOrbitalCoordinates(baseAngle - swayAmplitude);

          // Subtle staggered floating breathing offset (Desktop)
          const floatOffset = [0, -5, 0, 5, 0];

          // Z-index: On mobile, active foreground card is strictly on top (70).
          // Resting background cards: center is 25, inner sides 20, outer sides 10.
          // On desktop: center portrait is 40, adjacent 30, outer 20, hover is 100.
          const baseZDesktop = index === 2 ? 40 : index === 1 || index === 3 ? 30 : 20;
          const zIndex = isMobile
            ? isMobileActive
              ? 70
              : mobileHomeSlots[index].zIndex
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
                          pRight.y + floatOffset[(index + 1) % 5],
                          pNeutral.y + floatOffset[index],
                          pLeft.y + floatOffset[(index + 2) % 5],
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

      {/* Mobile Navigation Row Directly Beneath Cards (sm:hidden) */}
      <div className="sm:hidden absolute bottom-0.5 left-0 right-0 flex items-center justify-center pointer-events-auto z-40 px-2">
        <nav
          aria-label="Mobile portfolio navigation"
          className="flex items-center justify-center flex-nowrap gap-x-1 xs:gap-x-1.5 py-1.5 px-3 rounded-full bg-white/92 dark:bg-neutral-900/92 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-800 shadow-md max-w-full overflow-x-auto scrollbar-none"
        >
          {MOBILE_NAV_ITEMS.map((item, i) => {
            const isActive = mobileSeqIndex === i;
            return (
              <React.Fragment key={item.id}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-neutral-300 dark:text-neutral-700 select-none pointer-events-none text-[10px] font-mono leading-none px-0.5"
                  >
                    |
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => navigate(item.route)}
                  className={`px-1 py-0.5 text-[10px] xs:text-[11px] font-mono tracking-tight transition-colors duration-200 cursor-pointer rounded whitespace-nowrap ${
                    isActive
                      ? 'text-[#ea3826] font-bold underline decoration-[#ea3826] underline-offset-2'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white font-medium'
                  }`}
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};


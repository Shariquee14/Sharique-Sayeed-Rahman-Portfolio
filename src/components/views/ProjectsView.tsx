import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Terminal,
  Sparkles,
  Layers,
  Folder,
  FolderOpen,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Image,
  Palette,
  Video,
  Type,
  X,
  Check,
} from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../data/portfolioData';

interface ProjectsViewProps {
  onBack: () => void;
  onOpenContact: () => void;
}

interface FolderCardItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  badge: string;
  metaTop: string;
  subLabel: string;
  image: string;
  tools: string[];
  description: string;
  icon: React.ReactNode;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onBack, onOpenContact }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('view') === 'folder' ? 'folder' : 'manual';
  const [viewMode, setViewMode] = useState<'manual' | 'folder'>(initialMode);
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

  // Folder Animation States (Reused exactly from existing design)
  const [isHovered, setIsHovered] = useState(false);
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [spotlightCard, setSpotlightCard] = useState<FolderCardItem | null>(null);

  // Mobile-only opening sequence state & timer
  const [isMobileOpening, setIsMobileOpening] = useState(false);
  const mobileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mobileTimerRef.current) {
        clearTimeout(mobileTimerRef.current);
      }
    };
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isOpen = isLockedOpen || isHovered;

  const FOLDER_CARDS: FolderCardItem[] = [
    {
      id: 'creatives',
      number: '01',
      title: 'CREATIVES',
      tagline: 'RETROSPECTIVE & COLOR',
      badge: 'COLOR // RETOUCH',
      metaTop: 'PHOTOSHOP • LIGHTROOM',
      subLabel: 'ADVANCED COMPOSITING',
      image: './assets/edits/edit_creatives.jpg',
      tools: ['Adobe Photoshop', 'Lightroom Classic', 'Capture One', 'Camera Raw'],
      description:
        'High-end commercial photo retouching, visual compositing, advanced skin-tone texture retention, cinematic color grading, and creative image manipulation.',
      icon: <Image className="w-3.5 h-3.5 text-cyan-400" />,
    },
    {
      id: 'graphic-design-branding',
      number: '02',
      title: 'DESIGNED AND BRANDING',
      tagline: 'IDENTITY & ASSETS',
      badge: 'VECTOR // BRAND',
      metaTop: 'ILLUSTRATOR • BRANDING',
      subLabel: 'VISUAL ARCHITECTURE',
      image: './assets/edits/edit_graphic_branding.jpg',
      tools: ['Adobe Illustrator', 'Figma', 'Photoshop', 'Brand Systems'],
      description:
        'Comprehensive brand identity systems, modern vector graphics, typography hierarchies, logo redesigns, brand guidelines, and high-impact digital marketing assets.',
      icon: <Palette className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 'motion-graphics-typography',
      number: '03',
      title: 'MOTION GRAPHICS & TYPOGRAPHY',
      tagline: 'KINETIC & VFX',
      badge: 'AFTER EFFECTS // VFX',
      metaTop: 'KINETIC TYPE • SFX',
      subLabel: 'DYNAMIC OVERLAYS',
      image: './assets/edits/edit_motion_typography.jpg',
      tools: ['After Effects', 'Blender', 'Cinema 4D', 'Plugin Suite'],
      description:
        'Eye-catching kinetic typography, custom logo animations, lower-thirds, 3D isometric titles, UI HUD interfaces, and VFX motion designs that elevate brand storytelling.',
      icon: <Type className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      id: 'video-editing',
      number: '04',
      title: 'VIDEO EDITING',
      tagline: 'REELS, YOUTUBE & 4K',
      badge: '4K // POST-PRODUCTION',
      metaTop: 'PREMIERE • AFTER EFFECTS',
      subLabel: 'RETENTION & SCREENFLOW',
      image: './assets/edits/edit_short_form.jpg',
      tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut Pro'],
      description:
        'High-impact short-form and long-form video editing engineered for viewer retention across Instagram Reels, YouTube, podcasts, and documentaries. Multi-track pacing, kinetic captions, sound design, and acoustic leveling.',
      icon: <Video className="w-3.5 h-3.5 text-[#ea3826]" />,
    },
  ];

  // Calculate card coordinates and transformation when emerging from the folder
  const getCardTransform = (index: number) => {
    const isCardHovered = hoveredCardId === FOLDER_CARDS[index].id;

    if (!isOpen) {
      // Closed State: Cards are tightly packed inside the folder sleeve, peeking out slightly
      const peekOffset = isMobile ? -24 : -38;
      const xOffset = (index - 1.5) * (isMobile ? 14 : 24);
      const rot = (index - 1.5) * 2.8;
      return {
        x: xOffset,
        y: peekOffset,
        rotateZ: rot,
        scale: isMobile ? 0.74 : 0.84,
        opacity: 0.95,
        zIndex: 10 + index,
      };
    }

    // Open State (All 4 Cards Emerged & Fanned Out)
    if (isMobile) {
      // STRICTLY MOBILE ONLY: All 4 cards emerge symmetrically out of the folder
      const xPositions = [-96, -32, 32, 96];
      const yPositions = [-150, -185, -185, -150];
      const rotPositions = [-10, -3.5, 3.5, 10];
      const scaleBase = 0.72;

      return {
        x: xPositions[index],
        y: yPositions[index],
        rotateZ: rotPositions[index],
        scale: scaleBase,
        opacity: 1,
        zIndex: 20 + index,
      };
    }

    if (isTablet) {
      // Tablet (640px - 1024px)
      const xPositions = [-190, -64, 64, 190];
      const yPositions = [-180, -225, -225, -180];
      const rotPositions = [-11, -3.5, 3.5, 11];
      const scaleBase = 0.88;

      if (isCardHovered) {
        return {
          x: xPositions[index],
          y: yPositions[index] - 28,
          rotateZ: 0,
          scale: scaleBase * 1.12,
          opacity: 1,
          zIndex: 60,
        };
      }

      return {
        x: xPositions[index],
        y: yPositions[index],
        rotateZ: rotPositions[index],
        scale: scaleBase,
        opacity: 1,
        zIndex: 20 + index,
      };
    }

    // Desktop (>= 1024px): Wide sweeping architectural fan
    const xPositions = [-300, -100, 100, 300];
    const yPositions = [-230, -280, -280, -230];
    const rotPositions = [-12, -4, 4, 12];
    const scaleBase = [0.96, 1.0, 1.0, 0.96][index];

    if (isCardHovered) {
      return {
        x: xPositions[index],
        y: yPositions[index] - 32,
        rotateZ: 0,
        scale: scaleBase * 1.12,
        opacity: 1,
        zIndex: 60,
      };
    }

    return {
      x: xPositions[index],
      y: yPositions[index],
      rotateZ: rotPositions[index],
      scale: scaleBase,
      opacity: 1,
      zIndex: 20 + index,
    };
  };

  // Main folder tap/click action handler
  const handleFolderAction = () => {
    if (isMobile) {
      // Mobile tap sequence
      if (isMobileOpening) return;

      setIsMobileOpening(true);
      setIsLockedOpen(true);

      if (mobileTimerRef.current) {
        clearTimeout(mobileTimerRef.current);
      }

      // Smoothly emerge cards, then transition to manual project layout
      mobileTimerRef.current = setTimeout(() => {
        setViewMode('manual');
        setSearchParams({});
        setIsMobileOpening(false);
        setIsLockedOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1900);
    } else {
      // Desktop / Tablet behavior: standard toggle
      setIsLockedOpen((prev) => !prev);
    }
  };

  const handleSelectViewMode = (mode: 'manual' | 'folder') => {
    setViewMode(mode);
    setSearchParams(mode === 'folder' ? { view: 'folder' } : {});
    if (mode === 'folder') {
      setIsLockedOpen(false);
      setIsMobileOpening(false);
      if (mobileTimerRef.current) {
        clearTimeout(mobileTimerRef.current);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Breadcrumb & Switcher Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">RETURN TO PORTFOLIO DECK</span>
            <span className="sm:hidden">BACK TO DECK</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-xs text-cyan-600 font-bold">//</span>
            <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase">
              ENGINEERED REPOSITORIES
            </span>
          </div>
        </div>

        {/* Switching Options: Manual vs Folder */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center p-1 rounded-full bg-neutral-200 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 text-xs font-mono">
            <button
              onClick={() => handleSelectViewMode('manual')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'manual'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>MANUAL</span>
            </button>
            <button
              onClick={() => handleSelectViewMode('folder')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'folder'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>FOLDER</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        {viewMode === 'folder' ? (
          /* =========================================================================
              1. FOLDER VIEW: Animated 3D Folder & Emerging Cards
              ========================================================================= */
          <motion.div
            key="folder-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="relative w-full flex flex-col items-center justify-center pt-28 sm:pt-40 md:pt-48 pb-16 overflow-visible select-none"
          >
            {/* Ambient Glow Behind Folder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[350px] sm:h-[480px] bg-gradient-to-tr from-cyan-500/10 via-[#ea3826]/12 to-amber-500/10 blur-3xl pointer-events-none rounded-full" />

            {/* THE 3D FOLDER STAGE */}
            <motion.div
              ref={containerRef}
              animate={{
                y: isMobile && isMobileOpening ? -32 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 22,
                mass: 0.8,
              }}
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
              onClick={handleFolderAction}
              className="relative flex items-center justify-center perspective-[1200px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* BACK PANEL OF FOLDER */}
              <div className="relative z-10 w-[300px] xs:w-[360px] sm:w-[480px] md:w-[580px] flex flex-col items-start pointer-events-none">
                {/* Back Tab */}
                <div className="w-36 sm:w-48 h-8 sm:h-9 bg-neutral-800 dark:bg-neutral-900/95 border-t border-l border-r border-neutral-600/70 dark:border-neutral-700/80 rounded-t-xl sm:rounded-t-2xl flex items-center px-3 sm:px-4 gap-2 shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-neutral-300">
                    SHARIQ_VAULT.DIR
                  </span>
                </div>

                {/* Back Inner Body (Folder Pocket Base) */}
                <div className="w-full h-[220px] xs:h-[245px] sm:h-[290px] md:h-[325px] rounded-b-2xl sm:rounded-b-3xl rounded-tr-2xl sm:rounded-tr-3xl bg-[#0c0d11] dark:bg-[#07080a] border border-neutral-700/60 dark:border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 sm:p-6">
                  {/* Tech grid texture inside back sleeve */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                      backgroundSize: '18px 18px',
                    }}
                  />

                  {/* Back Plate Tech Metadata */}
                  <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9px] text-neutral-500 z-0">
                    <span>POST_PRODUCTION // 2026</span>
                    <span>CAPACITY: 04 / 04 LOADED</span>
                  </div>

                  <div className="text-center font-mono text-[10px] text-neutral-600 dark:text-neutral-600">
                    [ SHARIQLOGZ EDITING ARCHIVES ]
                  </div>
                </div>
              </div>

              {/* MIDDLE CARDS LAYER (The 4 Cards emerge upwards and fan out) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {FOLDER_CARDS.map((card, index) => {
                  const transform = getCardTransform(index);
                  const isCardHovered = hoveredCardId === card.id;

                  return (
                    <motion.div
                      key={card.id}
                      animate={{
                        x: transform.x,
                        y: transform.y,
                        rotateZ: transform.rotateZ,
                        scale: transform.scale,
                        opacity: transform.opacity,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: isOpen ? 220 : 280,
                        damping: isOpen ? 22 : 28,
                        mass: 0.8,
                        delay: isOpen ? index * 0.04 : 0,
                      }}
                      style={{
                        position: 'absolute',
                        zIndex: transform.zIndex,
                        transformOrigin: 'bottom center',
                      }}
                      onMouseEnter={() => !isMobile && isOpen && setHoveredCardId(card.id)}
                      onMouseLeave={() => !isMobile && isOpen && setHoveredCardId(null)}
                      onClick={(e) => {
                        if (!isMobile && isOpen) {
                          e.stopPropagation();
                          setSpotlightCard(card);
                        } else {
                          handleFolderAction();
                        }
                      }}
                      className="pointer-events-auto cursor-pointer group focus:outline-none"
                      tabIndex={0}
                      role="button"
                      aria-label={`Open details for ${card.title}`}
                    >
                      {/* The Visual Card Container */}
                      <div
                        className={`w-[170px] sm:w-[195px] md:w-[215px] h-[255px] sm:h-[285px] md:h-[310px] rounded-2xl md:rounded-3xl overflow-hidden card-rim transition-all duration-300 relative isolate bg-[#111216] text-white flex flex-col justify-between p-3.5 sm:p-4.5 ${
                          isCardHovered
                            ? 'shadow-[0_28px_60px_-10px_rgba(0,0,0,0.7),0_0_30px_rgba(234,56,38,0.35)] ring-2 ring-[#ea3826]'
                            : 'shadow-[0_16px_36px_-8px_rgba(0,0,0,0.5)] ring-1 ring-white/15'
                        }`}
                      >
                        {/* Full-Cover Background Image */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/60 pointer-events-none" />
                          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                        </div>

                        {/* Top Meta Header */}
                        <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-300 z-10 backdrop-blur-[2px] py-0.5">
                          <span className="flex items-center gap-1.5 font-bold text-white drop-shadow-sm">
                            {card.icon}
                            <span>{card.number}</span>
                          </span>
                          <span className="bg-black/55 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-mono text-white/90 border border-white/10 shadow-sm">
                            {card.badge}
                          </span>
                        </div>

                        {/* Middle Spacer */}
                        <div className="flex-1" />

                        {/* Bottom Typography & Category Meta */}
                        <div className="z-10 flex flex-col gap-0.5 border-t border-white/20 pt-2 backdrop-blur-[2px]">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-black text-[11px] sm:text-[12.5px] tracking-wider text-white leading-tight drop-shadow-md">
                              {card.title}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1" />
                          </div>
                          <div className="flex items-center justify-between text-[7.5px] sm:text-[8px] font-mono text-neutral-300 mt-0.5">
                            <span className="truncate max-w-[110px] drop-shadow-sm">{card.metaTop}</span>
                            <span className="text-[#ea3826] font-bold drop-shadow-sm">{card.subLabel}</span>
                          </div>
                        </div>

                        {/* Glass Sheen overlay */}
                        <div className="absolute inset-0 card-sheen pointer-events-none opacity-20 group-hover:opacity-50 transition-opacity duration-300 z-10" />
                      </div>

                      {/* Bottom Tagline Pill */}
                      <div
                        className={`text-center mt-2 transition-opacity duration-200 pointer-events-none ${
                          isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-900/90 text-white dark:bg-white dark:text-neutral-900 font-mono text-[8px] tracking-wider uppercase shadow-md font-semibold border border-white/10">
                          {card.tagline}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* FRONT FLAP OF FOLDER */}
              <motion.div
                animate={{
                  rotateX: isOpen ? 26 : 0,
                  y: isOpen ? 16 : 0,
                  scaleY: isOpen ? 0.94 : 1.0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 24,
                  mass: 0.8,
                }}
                style={{
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute bottom-0 z-30 w-[300px] xs:w-[360px] sm:w-[480px] md:w-[580px] flex flex-col items-start cursor-pointer group"
              >
                {/* Front Tab Button */}
                <div className="flex items-center justify-between w-full pr-2">
                  <div className="px-4 py-1.5 sm:py-2 rounded-t-xl sm:rounded-t-2xl bg-gradient-to-r from-neutral-900/95 to-neutral-800/95 dark:from-[#111216] dark:to-[#17181f] border-t border-l border-r border-white/20 dark:border-white/15 flex items-center gap-2 shadow-lg backdrop-blur-xl">
                    {isOpen ? (
                      <FolderOpen className="w-4 h-4 text-[#ea3826]" />
                    ) : (
                      <Folder className="w-4 h-4 text-[#ea3826]" />
                    )}
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider text-white">
                      {isOpen ? 'CLOSE FOLDER' : 'OPEN FOLDER'}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white/10 rounded text-neutral-300">
                      04 FILES
                    </span>
                  </div>

                  <div className="hidden xs:flex items-center gap-1.5 text-[9px] font-mono text-neutral-400 mb-1">
                    <Sparkles className="w-3 h-3 text-[#ea3826]" />
                    <span>CLICK OR TAP TO TOGGLE</span>
                  </div>
                </div>

                {/* Front Flap Glass Body */}
                <div className="w-full h-[180px] xs:h-[200px] sm:h-[240px] md:h-[265px] rounded-b-2xl sm:rounded-b-3xl rounded-tr-2xl sm:rounded-tr-3xl bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-black/95 dark:from-neutral-950/95 dark:via-black/95 dark:to-neutral-950/98 backdrop-blur-2xl border-t border-l border-r border-b border-white/20 dark:border-white/15 shadow-[0_20px_50px_-10px_rgba(234,56,38,0.22),0_15px_30px_rgba(0,0,0,0.6)] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-3 right-4 font-mono text-[9px] text-neutral-500 flex items-center gap-1">
                    <span>+</span>
                    <span className="tracking-widest">PRORES_4K</span>
                  </div>

                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#ea3826]/20 blur-2xl pointer-events-none rounded-full" />

                  <div className="z-10 mt-1 sm:mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#ea3826]" />
                      <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#ea3826] uppercase font-bold">
                        CREATIVE SUITE // POST-PRODUCTION
                      </span>
                    </div>

                    <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white drop-shadow-md">
                      Portfolio
                    </h2>

                    <p className="font-mono text-[10px] sm:text-xs text-neutral-400 mt-1 sm:mt-1.5 tracking-wider">
                      4 Specialized Post-Production &amp; Design Disciplines
                    </p>
                  </div>

                  <div className="z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[9px] sm:text-[10px] font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-neutral-300 font-semibold">ALL DISCIPLINES READY</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#ea3826] hover:text-white transition-all text-neutral-200 font-bold text-[9px] sm:text-[10px]">
                      <span>{isOpen ? 'EXPLORING' : 'EXPLORE'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="absolute inset-0 card-sheen pointer-events-none opacity-25" />
                </div>
              </motion.div>
            </motion.div>

            {/* Prompt Indicator Banner */}
            <div className="mt-8 sm:mt-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700/80 text-[10px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-300 shadow-md z-40">
              <span className="w-2 h-2 rounded-full bg-[#ea3826] animate-pulse" />
              <span>
                {isMobile
                  ? isMobileOpening
                    ? 'OPENING ARCHIVE & SWITCHING TO MANUAL...'
                    : 'TAP FOLDER TO OPEN ARCHIVE'
                  : 'HOVER OR CLICK FOLDER TO REVEAL 4 EDITING DISCIPLINES'}
              </span>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
              2. MANUAL VIEW: Existing Standard Project Layout
              ========================================================================= */
          <motion.div
            key="manual-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Interactive Project Selector (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-neutral-900 dark:bg-[#18181b] text-white p-5 rounded-3xl border border-neutral-800 shadow-md">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>TECHNICAL REPOSITORIES</span>
                </div>
                <h3 className="font-heading font-black text-xl tracking-tight">
                  Enterprise AI &amp; Predictive Systems
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Select any project below to inspect architectural details.
                </p>
              </div>

              <div className="space-y-3">
                {PROJECTS.map((proj) => {
                  const isActive = selectedProject.id === proj.id;
                  return (
                    <motion.div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                        isActive
                          ? 'bg-white dark:bg-[#1f1f23] border-[#ea3826] shadow-lg ring-2 ring-[#ea3826]/20'
                          : 'bg-white/80 dark:bg-[#18181b] border-neutral-300/80 dark:border-neutral-800 hover:bg-white dark:hover:bg-[#1f1f23] hover:border-neutral-400 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
                          SYS // {proj.id.toUpperCase()}
                        </span>
                        {isActive && (
                          <span className="bg-[#ea3826] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <h4 className="font-heading font-bold text-base text-neutral-950 dark:text-white mt-1.5 leading-snug">
                        {proj.title}
                      </h4>

                      <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mt-1">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        {proj.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-700 dark:text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {proj.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                            +{proj.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Deep-Dive Architectural Inspection (7 Cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col gap-6"
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ea3826] tracking-wider uppercase mb-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>ARCHITECTURE &amp; IMPLEMENTATION</span>
                    </div>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white leading-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {selectedProject.tagline}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Narrative description */}
                  <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                    {selectedProject.description}
                  </div>

                  {/* Core Resume Accomplishments */}
                  <div className="bg-neutral-50 dark:bg-neutral-900/60 rounded-2xl p-5 border border-neutral-200/80 dark:border-neutral-800">
                    <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#ea3826]" />
                      <span>Key Engineering Deliverables &amp; Workflows</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 leading-normal">
                          <ChevronRight className="w-3.5 h-3.5 text-[#ea3826] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture Components */}
                  <div>
                    <h4 className="font-heading font-bold text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                      <span>System Architecture Pipeline</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {selectedProject.architecture.map((block, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-neutral-900 dark:bg-black text-white font-mono text-[11px] flex flex-col justify-between gap-2 border border-neutral-800 dark:border-neutral-700"
                        >
                          <span className="text-[#ea3826] text-[9px] font-bold">LAYER 0{idx + 1}</span>
                          <span className="font-semibold">{block}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business & Technical Impact */}
                  <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 text-cyan-950 dark:text-cyan-200 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-wider text-cyan-800 dark:text-cyan-400 uppercase">
                        MEASURABLE IMPACT
                      </div>
                      <div className="text-xs font-medium text-cyan-900 dark:text-cyan-300 mt-0.5">
                        {selectedProject.impact}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-mono text-xs font-bold hover:bg-[#ea3826] dark:hover:bg-[#ea3826] dark:hover:text-white transition-colors shadow-sm"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>VIEW REPOSITORY ON GITHUB</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>

                    <button
                      onClick={onOpenContact}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-200 font-mono text-xs font-semibold transition-colors"
                    >
                      <span>DISCUSS ARCHITECTURE</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPOTLIGHT CARD MODAL (For Folder View Cards) */}
      <AnimatePresence>
        {spotlightCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSpotlightCard(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSpotlightCard(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Banner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={spotlightCard.image}
                  alt={spotlightCard.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/30" />

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-[#ea3826] text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      DISCIPLINE {spotlightCard.number}
                    </span>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1.5">
                      {spotlightCard.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {spotlightCard.description}
                </p>

                {/* Tools Used Section */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#ea3826]" />
                    <span>PROFESSIONAL TOOLS &amp; PIPELINES</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {spotlightCard.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-xs font-mono text-neutral-200 flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-[#ea3826]" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="font-mono text-xs text-neutral-500">
                    STATUS: AVAILABLE FOR COMMISSION
                  </span>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setSpotlightCard(null)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-neutral-700 text-xs font-mono text-neutral-300 hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      CLOSE
                    </button>
                    {onOpenContact && (
                      <button
                        onClick={() => {
                          setSpotlightCard(null);
                          onOpenContact();
                        }}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#ea3826] hover:bg-red-600 text-white text-xs font-mono font-bold tracking-wider transition-colors shadow-lg shadow-red-500/20 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>GET IN TOUCH</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsView;

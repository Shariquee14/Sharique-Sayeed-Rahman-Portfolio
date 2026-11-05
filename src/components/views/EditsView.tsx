import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Folder,
  FolderOpen,
  Sparkles,
  Layers,
  Image,
  Palette,
  Layout,
  Smartphone,
  Video,
  Type,
  X,
  Check,
} from 'lucide-react';

interface EditsViewProps {
  onBack: () => void;
  onOpenContact?: () => void;
}

interface EditCardItem {
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

export const EditsView: React.FC<EditsViewProps> = ({ onBack, onOpenContact }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [spotlightCard, setSpotlightCard] = useState<EditCardItem | null>(null);
  const [viewMode, setViewMode] = useState<'folder' | 'grid'>('folder');

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

  const EDIT_CARDS: EditCardItem[] = [
    {
      id: 'photo-image-editing',
      number: '01',
      title: 'PHOTO & IMAGE EDITING',
      tagline: 'RETROSPECTIVE & COLOR',
      badge: 'COLOR // RETOUCH',
      metaTop: 'LIGHTROOM • PHOTOSHOP',
      subLabel: 'ADVANCED COMPOSITING',
      image: './assets/edits/edit_photo_retouch.jpg',
      tools: ['Adobe Photoshop', 'Lightroom Classic', 'Capture One', 'Camera Raw'],
      description:
        'High-end commercial photo retouching, advanced skin-tone texture retention, cinematic color grading, background compositing, and surreal creative photo manipulation.',
      icon: <Image className="w-3.5 h-3.5 text-cyan-400" />,
    },
    {
      id: 'graphic-design-branding',
      number: '02',
      title: 'GRAPHIC DESIGN & BRANDING',
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
      id: 'thumbnails-social-creatives',
      number: '03',
      title: 'THUMBNAILS & CREATIVES',
      tagline: 'CTR & CONVERSION',
      badge: 'HIGH-CTR // 4K',
      metaTop: 'CTR OPTIMIZATION',
      subLabel: 'VIRAL COVER PACKS',
      image: './assets/edits/edit_thumbnails_creative.jpg',
      tools: ['Photoshop', 'Midjourney / AI Compositing', 'Cinema 4D', 'Illustrator'],
      description:
        'High-converting YouTube thumbnails, 3D text typography, dramatic facial lighting, curiosity gap framing, and high-CTR marketing graphics designed to maximize views.',
      icon: <Layout className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      id: 'short-form-video-editing',
      number: '04',
      title: 'SHORT-FORM VIDEO EDITING',
      tagline: 'REELS & TIKTOKS',
      badge: '9:16 // RETENTION',
      metaTop: 'VIRAL HOOK PACING',
      subLabel: 'SHORTS & REELS',
      image: './assets/edits/edit_short_form.jpg',
      tools: ['CapCut Pro', 'Premiere Pro', 'After Effects', 'Descript'],
      description:
        'Engineered for maximum viewer retention across Instagram Reels, YouTube Shorts, and TikTok. Fast-paced hook pacing, dynamic kinetic captions, SFX risers, and punchy zooms.',
      icon: <Smartphone className="w-3.5 h-3.5 text-purple-400" />,
    },
    {
      id: 'long-form-video-editing',
      number: '05',
      title: 'LONG-FORM VIDEO EDITING',
      tagline: 'YOUTUBE & COURSES',
      badge: '16:9 // MASTERCLASSES',
      metaTop: 'STORY & NARRATIVE',
      subLabel: 'CINEMATIC SCREENFLOW',
      image: './assets/edits/edit_long_form.jpg',
      tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Audition'],
      description:
        'Cinematic long-form YouTube documentaries, comprehensive courses, masterclasses, and podcasts. Seamless multi-camera narrative pacing, B-roll selection, and acoustic leveling.',
      icon: <Video className="w-3.5 h-3.5 text-[#ea3826]" />,
    },
    {
      id: 'motion-graphics-typography',
      number: '06',
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
  ];

  // Calculate card coordinates and transformation when emerging from the folder
  const getCardTransform = (index: number) => {
    const isCardHovered = hoveredCardId === EDIT_CARDS[index].id;

    if (!isOpen) {
      // Closed State: Cards are tightly packed inside the folder sleeve, peeking out slightly
      const peekOffset = isMobile ? -24 : -38;
      const xOffset = (index - 2.5) * (isMobile ? 12 : 20);
      const rot = (index - 2.5) * 2.2;
      return {
        x: xOffset,
        y: peekOffset,
        rotateZ: rot,
        scale: isMobile ? 0.72 : 0.82,
        opacity: 0.95,
        zIndex: 10 + index,
      };
    }

    // Open State (All 6 Cards Emerged & Fanned Out)
    if (isMobile) {
      // STRICTLY MOBILE ONLY: All 6 cards emerge symmetrically out of the folder
      const xPositions = [-112, -68, -24, 24, 68, 112];
      const yPositions = [-140, -175, -200, -200, -175, -140];
      const rotPositions = [-13, -8, -3, 3, 8, 13];
      const scaleBase = 0.70;

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
      const xPositions = [-235, -140, -48, 48, 140, 235];
      const yPositions = [-165, -205, -230, -230, -205, -165];
      const rotPositions = [-13, -8, -2, 2, 8, 13];
      const scaleBase = 0.84;

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
    const xPositions = [-365, -220, -75, 75, 220, 365];
    const yPositions = [-205, -255, -285, -285, -255, -205];
    const rotPositions = [-15, -9, -3, 3, 9, 15];
    const scaleBase = [0.92, 0.96, 1.0, 1.0, 0.96, 0.92][index];

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
      // STRICTLY MOBILE ONLY:
      // 1. Prevent accidental repeated taps
      if (isMobileOpening) return;

      setIsMobileOpening(true);
      setIsLockedOpen(true);

      // 2. Folder floats upward, flap opens, all 6 cards smoothly emerge
      // 3. Wait approx 1 second once fully emerged, then transition to Grid Section (~1.9s total)
      if (mobileTimerRef.current) {
        clearTimeout(mobileTimerRef.current);
      }

      mobileTimerRef.current = setTimeout(() => {
        setViewMode('grid');
        setIsMobileOpening(false);
        setIsLockedOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1900);
    } else {
      // Desktop / Tablet behavior: standard toggle
      setIsLockedOpen((prev) => !prev);
    }
  };

  const handleSelectViewMode = (mode: 'folder' | 'grid') => {
    setViewMode(mode);
    if (mode === 'folder') {
      setIsLockedOpen(false);
      setIsMobileOpening(false);
      if (mobileTimerRef.current) {
        clearTimeout(mobileTimerRef.current);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 select-none">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-300 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">RETURN TO PORTFOLIO DECK</span>
            <span className="sm:hidden">BACK</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-xs text-[#ea3826] font-bold">//</span>
            <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              INTERACTIVE ARCHIVE
            </span>
          </div>
        </div>

        {/* View Switcher & Folder Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center p-1 rounded-full bg-neutral-200 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 text-xs font-mono">
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
            <button
              onClick={() => handleSelectViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>GRID (6)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        {viewMode === 'folder' ? (
          <motion.div
            key="folder-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="relative w-full flex flex-col items-center justify-center pt-28 sm:pt-40 md:pt-48 pb-16 overflow-visible"
          >
            {/* Subtle Cyber Grid & Ambient Glow Behind Folder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[350px] sm:h-[480px] bg-gradient-to-tr from-cyan-500/10 via-[#ea3826]/12 to-amber-500/10 blur-3xl pointer-events-none rounded-full" />

            {/* =========================================================================
                THE 3D FOLDER STAGE
                On Mobile: smoothly floats upward upon tap with the opening animation
                ========================================================================= */}
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
              {/* -------------------------------------------------------------
                  BACK PANEL OF FOLDER (Layer z-10)
                  ------------------------------------------------------------- */}
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
                    <span>CAPACITY: 06 / 06 LOADED</span>
                  </div>

                  <div className="text-center font-mono text-[10px] text-neutral-600 dark:text-neutral-600">
                    [ SHARIQLOGZ EDITING ARCHIVES ]
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  MIDDLE CARDS LAYER (Layer z-20 to z-50)
                  The 6 Cards emerge upwards and fan out from inside the sleeve
                  ------------------------------------------------------------- */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {EDIT_CARDS.map((card, index) => {
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
                          {/* Dark gradient overlay for text legibility */}
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

                        {/* Middle Spacer - Leaves artwork front & center */}
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

                      {/* Bottom Tagline Pill (visible when opened or hovered) */}
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

              {/* -------------------------------------------------------------
                  FRONT FLAP OF FOLDER (Layer z-30)
                  Tilts forward in 3D perspective when the folder opens!
                  ------------------------------------------------------------- */}
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
                      06 FILES
                    </span>
                  </div>

                  <div className="hidden xs:flex items-center gap-1.5 text-[9px] font-mono text-neutral-400 mb-1">
                    <Sparkles className="w-3 h-3 text-[#ea3826]" />
                    <span>CLICK OR TAP TO TOGGLE</span>
                  </div>
                </div>

                {/* Front Flap Glass Body */}
                <div className="w-full h-[180px] xs:h-[200px] sm:h-[240px] md:h-[265px] rounded-b-2xl sm:rounded-b-3xl rounded-tr-2xl sm:rounded-tr-3xl bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-black/95 dark:from-neutral-950/95 dark:via-black/95 dark:to-neutral-950/98 backdrop-blur-2xl border-t border-l border-r border-b border-white/20 dark:border-white/15 shadow-[0_20px_50px_-10px_rgba(234,56,38,0.22),0_15px_30px_rgba(0,0,0,0.6)] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
                  {/* Tech Crosshair accents */}
                  <div className="absolute top-3 right-4 font-mono text-[9px] text-neutral-500 flex items-center gap-1">
                    <span>+</span>
                    <span className="tracking-widest">PRORES_4K</span>
                  </div>

                  {/* Ambient Internal Glow */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#ea3826]/20 blur-2xl pointer-events-none rounded-full" />

                  {/* Front Main Typography */}
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
                      6 Specialized Post-Production &amp; Design Disciplines
                    </p>
                  </div>

                  {/* Bottom Bar on Front Flap */}
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

                  {/* Glass Sheen */}
                  <div className="absolute inset-0 card-sheen pointer-events-none opacity-25" />
                </div>
              </motion.div>
            </motion.div>

            {/* Prompt Indicator Banner (Positioned Downwards to the Folder) */}
            <div className="mt-8 sm:mt-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700/80 text-[10px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-300 shadow-md z-40">
              <span className="w-2 h-2 rounded-full bg-[#ea3826] animate-pulse" />
              <span>
                {isMobile
                  ? isMobileOpening
                    ? 'OPENING ARCHIVE & PREPARING GRID...'
                    : 'TAP FOLDER TO OPEN ARCHIVE'
                  : 'HOVER OR CLICK FOLDER TO REVEAL 6 EDITING DISCIPLINES'}
              </span>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
              GRID SECTION (Displays all 6 cards in full detail)
              ========================================================================= */
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full py-4"
          >
            {/* Grid Header Info on Mobile */}
            {isMobile && (
              <div className="mb-4 text-center">
                <span className="font-mono text-[10px] text-[#ea3826] tracking-widest uppercase font-bold">
                  // ALL 6 EDITING DISCIPLINES LOADED
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center py-2">
              {EDIT_CARDS.map((card, index) => {
                const isHoveredCard = hoveredCardId === card.id;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => setSpotlightCard(card)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    tabIndex={0}
                    role="button"
                    aria-label={card.title}
                  >
                    <motion.div
                      animate={{
                        y: isHoveredCard ? -12 : 0,
                        scale: isHoveredCard ? 1.04 : 1.0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 340,
                        damping: 24,
                        mass: 0.8,
                      }}
                      className={`w-[210px] sm:w-[225px] md:w-[240px] h-[310px] sm:h-[330px] md:h-[350px] rounded-2xl md:rounded-3xl overflow-hidden card-rim transition-all duration-300 relative isolate bg-[#111216] text-white flex flex-col justify-between p-4 sm:p-5 ${
                        isHoveredCard
                          ? 'shadow-[0_28px_55px_-10px_rgba(0,0,0,0.5),0_0_25px_rgba(234,56,38,0.25)] ring-2 ring-neutral-900/90 dark:ring-white/80'
                          : 'shadow-[0_16px_32px_-8px_rgba(0,0,0,0.22)] ring-1 ring-black/10 dark:ring-white/10'
                      }`}
                    >
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

                      <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-300 z-10 backdrop-blur-[2px] py-0.5">
                        <span className="flex items-center gap-1.5 font-bold text-white drop-shadow-sm">
                          {card.icon}
                          <span>{card.number}</span>
                        </span>
                        <span className="bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-mono text-white/90 border border-white/10 shadow-sm">
                          {card.badge}
                        </span>
                      </div>

                      <div className="flex-1" />

                      <div className="z-10 flex flex-col gap-1 border-t border-white/20 pt-2.5 backdrop-blur-[2px]">
                        <div className="flex items-center justify-between">
                          <span className="font-heading font-black text-xs sm:text-[13px] tracking-wider text-white leading-tight drop-shadow-md">
                            {card.title}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1" />
                        </div>
                        <div className="flex items-center justify-between text-[8px] font-mono text-neutral-300 mt-0.5">
                          <span className="truncate max-w-[130px] drop-shadow-sm">{card.metaTop}</span>
                          <span className="text-[#ea3826] font-bold drop-shadow-sm">{card.subLabel}</span>
                        </div>
                      </div>

                      <div className="absolute inset-0 card-sheen pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300 z-10" />
                    </motion.div>

                    <div className="text-center mt-3 pointer-events-none">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-mono text-[9px] tracking-wider uppercase shadow-md font-semibold">
                        {card.tagline}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SPOTLIGHT CARD MODAL (Opened when any card is clicked)
          ========================================================================= */}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CorkboardGrid from '../CorkboardGrid';
import {
  ArrowLeft,
  ArrowUpRight,
  Image,
  Palette,
  Video,
  Type,
  X,
  Sparkles,
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
  const navigate = useNavigate();
  const [spotlightCard, setSpotlightCard] = useState<EditCardItem | null>(null);

  const EDIT_CARDS: EditCardItem[] = [
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 select-none">
      {/* Top Header & Breadcrumb (No Switcher Buttons) */}
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
      </div>

      {/* Main Grid View Only */}
      <div className="w-full py-4">
        <CorkboardGrid
          cards={[
            {
              ...EDIT_CARDS[0],
              id: 1,
              title: 'Creatives',
              tag: 'Creatives',
              x: 73,
              y: 20,
              r: 4,
              img: EDIT_CARDS[0].image,
            },
            {
              ...EDIT_CARDS[1],
              id: 2,
              title: 'Designed and Branding',
              tag: 'Branding',
              x: 76,
              y: 58,
              r: -3,
              img: EDIT_CARDS[1].image,
            },
            {
              ...EDIT_CARDS[2],
              id: 3,
              title: 'Motion Graphics & Typography',
              tag: 'Motion',
              x: 23,
              y: 54,
              r: -5,
              img: EDIT_CARDS[2].image,
            },
            {
              ...EDIT_CARDS[3],
              id: 4,
              title: 'Video Editing',
              tag: 'Video',
              x: 48,
              y: 78,
              r: 3,
              img: EDIT_CARDS[3].image,
            },
          ]}
          heading="WORK"
          onSelect={(card: any) => {
            const cardId = String(card.id || '');
            const cardTitle = (card.title || '').toLowerCase();
            if (cardId === '1' || cardId === 'creatives' || cardTitle.includes('creative')) {
              navigate('/creatives');
            } else {
              const matched =
                EDIT_CARDS.find(
                  (c) =>
                    c.id === card.id ||
                    c.title.toLowerCase() === (card.title || '').toLowerCase()
                ) ||
                EDIT_CARDS[(card.id || 1) - 1] ||
                card;
              setSpotlightCard(matched);
            }
          }}
        />
      </div>

      {/* SPOTLIGHT CARD MODAL (Opened when any card is clicked) */}
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

export default EditsView;

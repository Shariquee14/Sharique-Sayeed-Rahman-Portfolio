import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Play,
  RotateCw,
  Film,
  Flame,
  X,
  CheckCircle2,
} from 'lucide-react';
import { YoutubeIcon } from '../SocialIcons';
import {
  CHANNEL_INFO,
  fetchChannelVideos,
  type FetchVideosResult,
} from '../../utils/youtubeService';
import type { YouTubeVideo } from '../../types/youtube';

interface YouTubeViewProps {
  onBack: () => void;
  onOpenContact?: () => void;
}

export const YouTubeView: React.FC<YouTubeViewProps> = ({ onBack }) => {
  const [data, setData] = useState<FetchVideosResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  const loadVideos = useCallback(async (force = false) => {
    if (force) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const result = await fetchChannelVideos(force);
      setData(result);
    } catch (err) {
      console.error('Failed to load YouTube videos:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadVideos(false);
  }, [loadVideos]);

  // Handle ESC key to close modal player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  // Helper to duplicate items for smooth endless marquee loop
  const getLoopItems = (items: YouTubeVideo[]) => {
    if (items.length === 0) return [];
    // If fewer than 6 items, repeat enough to fill widescreen marquee
    if (items.length < 6) {
      return [...items, ...items, ...items, ...items];
    }
    return [...items, ...items];
  };

  const shorts = data?.shorts || [];
  const longVideos = data?.longVideos || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 select-none">
      {/* Top Breadcrumb & Return to Deck */}
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
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase">
            CHANNEL REPOSITORIES
          </span>
        </div>
      </div>

      {/* Channel Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#18181b]/95 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-800 shadow-xl relative overflow-hidden"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#ea3826]/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Left: Avatar + Channel Info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-950 flex items-center justify-center border border-neutral-700 shadow-md shrink-0 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ea3826] to-red-500 opacity-90" />
              <YoutubeIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#ea3826] uppercase">
                  OFFICIAL CREATOR FEED
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                  VERIFIED
                </span>
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white tracking-tight flex items-center gap-2">
                {CHANNEL_INFO.name}
                <span className="text-xs sm:text-sm font-mono font-normal text-neutral-500 dark:text-neutral-400">
                  {CHANNEL_INFO.handle}
                </span>
              </h1>

              <p className="text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
                {CHANNEL_INFO.description}
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap self-start md:self-auto shrink-0">
            {/* Sync live feed button */}
            <button
              onClick={() => loadVideos(true)}
              disabled={isRefreshing}
              title="Refresh channel feed from YouTube"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#ea3826]' : ''}`} />
              <span className="hidden sm:inline">
                {isRefreshing ? 'SYNCING...' : 'SYNC FEED'}
              </span>
            </button>

            {/* Visit channel link */}
            <a
              href={CHANNEL_INFO.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold bg-[#ea3826] hover:bg-[#d02f1f] text-white transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>VISIT CHANNEL</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Live sync status pill */}
        <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>STATUS // AUTOMATIC CHANNEL SYNC ACTIVE</span>
          </div>

          <div className="flex items-center gap-3">
            <span>ID: {CHANNEL_INFO.channelId}</span>
            <span>•</span>
            <span>LAST SYNC: {data?.lastUpdated || 'Standby'}</span>
          </div>
        </div>
      </motion.div>

      {/* Loading state skeleton */}
      {isLoading && (
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="h-6 w-48 bg-neutral-300 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="w-[220px] h-[380px] bg-neutral-200 dark:bg-neutral-800/60 rounded-3xl shrink-0 animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-48 bg-neutral-300 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-[340px] h-[190px] bg-neutral-200 dark:bg-neutral-800/60 rounded-3xl shrink-0 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="space-y-14">
          {/* ============================================================== */}
          {/* SECTION 1: YOUTUBE SHORTS (9:16 VERTICAL CARDS - MARQUEE RTL) */}
          {/* ============================================================== */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
              <div>
                <div className="flex items-center gap-2 text-[#ea3826] font-mono text-[10px] tracking-widest uppercase mb-0.5">
                  <Flame className="w-3.5 h-3.5 text-[#ea3826]" />
                  <span>VERTICAL FORMAT // 9:16</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-neutral-950 dark:text-white tracking-tight">
                  YouTube Shorts
                </h2>
              </div>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Hover or touch any card to pause • Click to watch
              </p>
            </div>

            {/* Seamless Infinite Marquee Container (Shorts) */}
            <div className="relative w-full overflow-hidden py-3 group">
              {/* Left / Right soft gradient feather overlays */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-20 bg-gradient-to-r from-[#ececee] dark:from-[#18181b] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-20 bg-gradient-to-l from-[#ececee] dark:from-[#18181b] to-transparent" />

              <div className="animate-marquee-rtl marquee-pause-hover flex gap-4 sm:gap-5">
                {getLoopItems(shorts).map((video, idx) => (
                  <motion.div
                    key={`${video.id}-${idx}`}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setActiveVideo(video)}
                    className="relative w-[200px] sm:w-[230px] h-[350px] sm:h-[400px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-lg hover:shadow-2xl hover:border-[#ea3826] transition-all group/card"
                  >
                    {/* Video Thumbnail (Cover image) */}
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                      onError={(e) => {
                        // Fallback to standard thumbnail if hqdefault fails
                        (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${video.id}/default.jpg`;
                      }}
                    />

                    {/* Gradient Overlay for Readable Typography */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-[#ea3826] text-white shadow-md">
                        <Flame className="w-2.5 h-2.5" />
                        SHORTS
                      </span>
                      <span className="text-[10px] font-mono text-white/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {video.formattedDate}
                      </span>
                    </div>

                    {/* Centered Play Button on Card Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-14 h-14 rounded-full bg-[#ea3826] text-white flex items-center justify-center shadow-xl transform scale-75 group-hover/card:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>

                    {/* Bottom Title & Details */}
                    <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                      <h3 className="font-heading font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug drop-shadow-sm mb-1.5">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
                        <span className="flex items-center gap-1 text-red-400">
                          <Film className="w-3 h-3" />
                          <span>TAP TO WATCH</span>
                        </span>
                        <span className="text-neutral-400">9:16</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 2: LONG VIDEOS (16:9 LANDSCAPE CARDS - MARQUEE RTL) */}
          {/* ============================================================== */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
              <div>
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-0.5">
                  <Film className="w-3.5 h-3.5" />
                  <span>LANDSCAPE FORMAT // 16:9</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-neutral-950 dark:text-white tracking-tight">
                  Long Videos & Tutorials
                </h2>
              </div>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Independent continuous scroll • Pause on hover
              </p>
            </div>

            {/* Seamless Infinite Marquee Container (Long Videos) */}
            <div className="relative w-full overflow-hidden py-3 group">
              {/* Left / Right soft gradient feather overlays */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-20 bg-gradient-to-r from-[#ececee] dark:from-[#18181b] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-20 bg-gradient-to-l from-[#ececee] dark:from-[#18181b] to-transparent" />

              <div className="animate-marquee-rtl-slow marquee-pause-hover flex gap-4 sm:gap-6">
                {getLoopItems(longVideos).map((video, idx) => (
                  <motion.div
                    key={`${video.id}-${idx}`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setActiveVideo(video)}
                    className="relative w-[280px] sm:w-[360px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-800 shadow-md hover:shadow-xl hover:border-cyan-500 transition-all group/card flex flex-col"
                  >
                    {/* 16:9 Thumbnail Box */}
                    <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/40 transition-colors duration-300" />

                      {/* Play overlay button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-[#ea3826] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover/card:scale-100 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Video Type Badge */}
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-neutral-900/80 backdrop-blur-md text-white border border-neutral-700">
                        <Film className="w-2.5 h-2.5 text-cyan-400" />
                        TUTORIAL
                      </span>

                      {/* Published date */}
                      <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-white bg-black/70 px-2 py-0.5 rounded">
                        {video.formattedDate}
                      </span>
                    </div>

                    {/* Card Description Footer */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="font-heading font-bold text-xs sm:text-sm text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover/card:text-[#ea3826] dark:group-hover/card:text-[#ea3826] transition-colors">
                        {video.title}
                      </h3>

                      <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                        <span className="text-[#ea3826] font-bold flex items-center gap-1">
                          <Play className="w-3 h-3 fill-[#ea3826]" />
                          WATCH EMBED
                        </span>
                        <span>SHARIQLOGZ</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ============================================================== */}
      {/* IN-SITE EMBEDDED MODAL PLAYER */}
      {/* ============================================================== */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`relative z-10 w-full ${
                activeVideo.isShort ? 'max-w-xs sm:max-w-md' : 'max-w-4xl'
              } bg-neutral-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 shadow-[0_24px_70px_rgba(0,0,0,0.8)] flex flex-col`}
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90 text-white gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-7 h-7 rounded-lg bg-[#ea3826] flex items-center justify-center shrink-0">
                    <YoutubeIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs sm:text-sm font-heading font-bold truncate">
                      {activeVideo.title}
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-400">
                      {activeVideo.isShort ? 'YouTube Short' : 'Long Video'} • {activeVideo.formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open directly on YouTube"
                    className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveVideo(null)}
                    title="Close player (Esc)"
                    className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Responsive Video Embed */}
              <div
                className={`w-full relative ${
                  activeVideo.isShort
                    ? 'aspect-[9/16] max-h-[65vh] sm:max-h-[75vh] mx-auto'
                    : 'aspect-video'
                } bg-black`}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Bottom Bar */}
              <div className="p-3.5 sm:p-4 bg-neutral-900/60 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ea3826]" />
                  SHARIQLOGZ // EMBEDDED PLAYER
                </span>
                <span className="text-[10px] text-neutral-500">Press ESC to exit</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

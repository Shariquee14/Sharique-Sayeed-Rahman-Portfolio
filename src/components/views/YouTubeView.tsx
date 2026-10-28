import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  RotateCw,
  CheckCircle2,
  ListVideo,
  Play,
  Layers,
  Sparkles,
} from 'lucide-react';
import { YoutubeIcon } from '../SocialIcons';
import {
  CHANNEL_INFO,
  fetchChannelPlaylists,
  type FetchPlaylistsResult,
} from '../../utils/youtubeService';
import type { YouTubePlaylist } from '../../types/youtube';

interface YouTubeViewProps {
  onBack: () => void;
  onOpenContact?: () => void;
}

export const YouTubeView: React.FC<YouTubeViewProps> = ({ onBack }) => {
  const [data, setData] = useState<FetchPlaylistsResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function init() {
      setIsLoading(true);
      try {
        const result = await fetchChannelPlaylists(false);
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        console.error('Failed to load YouTube playlists:', err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await fetchChannelPlaylists(true);
      setData(result);
    } catch (err) {
      console.error('Failed to refresh YouTube playlists:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const playlists: YouTubePlaylist[] = data?.playlists || [];

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
            CHANNEL PLAYLISTS
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
                  OFFICIAL CREATOR PLAYLISTS
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
            {/* Sync live playlists button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refresh playlists from YouTube"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#ea3826]' : ''}`} />
              <span className="hidden sm:inline">
                {isRefreshing ? 'SYNCING...' : 'SYNC PLAYLISTS'}
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
            <span>STATUS // AUTOMATIC PLAYLIST SYNC ACTIVE</span>
          </div>

          <div className="flex items-center gap-3">
            <span>PLAYLISTS: {playlists.length} AVAILABLE</span>
            <span>•</span>
            <span>LAST SYNC: {data?.lastUpdated || 'Standby'}</span>
          </div>
        </div>
      </motion.div>

      {/* Playlists Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#ea3826] tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>CURATED SERIES & COURSES</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-white">
            Channel Playlists
          </h2>
        </div>
        <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
          Click any playlist to open and watch on YouTube
        </div>
      </div>

      {/* Loading state skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-3xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-800 p-5 space-y-4 animate-pulse"
            >
              <div className="w-full aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
              <div className="h-5 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded" />
              <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* Main Playlists Grid */}
      {!isLoading && playlists.length > 0 && (
        <div className={`grid grid-cols-1 ${playlists.length <= 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 sm:gap-8`}>
          {playlists.map((playlist, index) => (
            <motion.a
              key={playlist.id || index}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 hover:border-[#ea3826]/60 dark:hover:border-[#ea3826]/70 shadow-lg hover:shadow-2xl hover:shadow-[#ea3826]/10 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Stacked Playlist visual bar effect */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#ea3826] via-red-500 to-amber-500 opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video bg-neutral-950 overflow-hidden">
                <img
                  src={playlist.thumbnailUrl}
                  alt={playlist.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Playlist Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono font-medium shadow-md">
                  <ListVideo className="w-3.5 h-3.5 text-[#ea3826]" />
                  <span>PLAYLIST</span>
                </div>

                {/* Bottom-right Video/Lesson Count Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-mono font-semibold shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{playlist.itemCount || 'Playlist'}</span>
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <div className="w-14 h-14 rounded-full bg-[#ea3826] text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Playlist Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-lg text-neutral-900 dark:text-white group-hover:text-[#ea3826] dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-2">
                    {playlist.title}
                  </h3>

                  {/* Description */}
                  <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {playlist.description ||
                      'Complete curated video series and step-by-step learning tutorials by ShariqLogz.'}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-wider text-[#ea3826] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    OPEN ON YOUTUBE
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                    youtube.com
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && playlists.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-800">
          <ListVideo className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-lg font-heading font-bold text-neutral-800 dark:text-white mb-2">
            No Playlists Found
          </h3>
          <p className="text-sm font-mono text-neutral-500 mb-6 max-w-md mx-auto">
            Unable to retrieve playlists at this time. Please check your internet connection or sync again.
          </p>
          <button
            onClick={handleRefresh}
            className="px-5 py-2.5 rounded-full bg-[#ea3826] hover:bg-[#d02f1f] text-white text-xs font-mono font-bold cursor-pointer transition-all shadow-md"
          >
            RETRY SYNC
          </button>
        </div>
      )}
    </div>
  );
};

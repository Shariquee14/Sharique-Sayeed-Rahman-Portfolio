import type { YouTubePlaylist, YouTubeChannelInfo } from '../types/youtube';

export const CHANNEL_INFO: YouTubeChannelInfo = {
  name: 'ShariqLogz',
  handle: '@Shariqlogz',
  channelId: 'UC2cuJbYZ1LE72OhUs52LZHA',
  url: 'https://www.youtube.com/@Shariqlogz',
  description: 'AI Video Creation, Tech Tutorials, Creative AI Tools & Digital Innovation',
};

// Verified baseline catalog of real playlists from @Shariqlogz
export const BASELINE_PLAYLISTS: YouTubePlaylist[] = [
  {
    id: 'PLBBb2c_Z0dnk',
    title: 'GitHub Full Tutorial 🔥🚀',
    description: 'GitHub seekhna hai bilkul zero se? Ye playlist aapke liye hai! 💻 Is series mein hum step by step GitHub ki har cheez simple Hinglish mein seekhenge, bina kisi confusion ke.',
    itemCount: '10 lessons',
    thumbnailUrl: 'https://i.ytimg.com/pl_c/PLBBb2c_Z0dnk/studio_square_thumbnail.jpg?sqp=CJPOh9cG-oaymwEICIAKENAFSFqi85f_AwYI7LTz1gY=&rs=AOn4CLAWkp7Wy3dLXIOobNk51PP6LBfDaQ',
    url: 'https://www.youtube.com/playlist?list=PLBBb2c_Z0dnk',
  },
  {
    id: 'PLS-zY-uxoC_I',
    title: 'Meta Ads Day 1 to 30 🔥| ShariqLogz 🔥',
    description: 'Master Meta Ads step-by-step from Day 1 to Day 30: Business Manager setup, Campaign Objectives, Ad Account setup, Payment methods, and scaling.',
    itemCount: '4 lessons',
    thumbnailUrl: 'https://i.ytimg.com/vi/1hDpGbjrjXk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDC99Rco02YUbDZZrSM9IxOSVJImw',
    url: 'https://www.youtube.com/playlist?list=PLS-zY-uxoC_I',
  },
];

const CACHE_KEY = 'shariqlogz_playlists_cache_v1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export interface FetchPlaylistsResult {
  playlists: YouTubePlaylist[];
  source: 'live' | 'cache' | 'baseline';
  lastUpdated: string;
  error?: string;
}

export async function fetchChannelPlaylists(forceRefresh = false): Promise<FetchPlaylistsResult> {
  // 1. Check local storage cache if not force refreshing
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const rawCache = localStorage.getItem(CACHE_KEY);
      if (rawCache) {
        const parsed = JSON.parse(rawCache);
        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          if (Array.isArray(parsed.playlists) && parsed.playlists.length > 0) {
            return {
              playlists: parsed.playlists,
              source: 'cache',
              lastUpdated: parsed.lastSynced || new Date(parsed.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
          }
        }
      }
    } catch {
      // Ignore cache read errors
    }
  }

  // 2. In Local Development: Try local Vite dev endpoint /api/youtube-playlists
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      const devRes = await fetch('/api/youtube-playlists', { signal: AbortSignal.timeout(4000) });
      if (devRes.ok) {
        const data = await devRes.json();
        if (Array.isArray(data.playlists) && data.playlists.length > 0) {
          const playlists: YouTubePlaylist[] = data.playlists;
          const lastSyncLabel = data.formattedLastSync || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            playlists,
            source: 'live',
            lastUpdated: lastSyncLabel,
          };
        }
      }
    } catch {
      // Dev proxy not available, continue to static synchronized catalog
    }
  }

  // 3. Production & Static Hosting: Fetch the automated static catalog ./data/youtube-playlists.json
  try {
    const cacheBuster = forceRefresh ? `?t=${Date.now()}` : '';
    const base = import.meta.env.BASE_URL || './';
    const catalogUrl = `${base.endsWith('/') ? base : base + '/'}data/youtube-playlists.json${cacheBuster}`;
    const staticRes = await fetch(catalogUrl, {
      cache: forceRefresh ? 'no-cache' : 'default',
      signal: AbortSignal.timeout(5000),
    });

    if (staticRes.ok) {
      const catalog = await staticRes.json();
      if (catalog && Array.isArray(catalog.playlists) && catalog.playlists.length > 0) {
        const playlists: YouTubePlaylist[] = catalog.playlists;
        const lastSyncLabel = catalog.formattedLastSync ||
          new Date(catalog.lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Update localStorage cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              playlists,
              lastSynced: lastSyncLabel,
            })
          );
        } catch {
          // Ignore localStorage errors
        }

        return {
          playlists,
          source: 'live',
          lastUpdated: lastSyncLabel,
        };
      }
    }
  } catch {
    // Static fetch failed, fall back to baseline
  }

  // 4. Guaranteed Offline Fallback: Use verified baseline playlists from channel
  return {
    playlists: BASELINE_PLAYLISTS,
    source: 'baseline',
    lastUpdated: 'Live sync standby',
  };
}

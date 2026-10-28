import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CHANNEL_ID = 'UC2cuJbYZ1LE72OhUs52LZHA';
const CHANNEL_HANDLE = '@Shariqlogz';
const PLAYLISTS_URL = `https://www.youtube.com/${CHANNEL_HANDLE}/playlists`;
const DATA_DIR = path.join(rootDir, 'public', 'data');
const DATA_FILE = path.join(DATA_DIR, 'youtube-playlists.json');

// Verified fallback playlists from @Shariqlogz
const BASELINE_PLAYLISTS = [
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

export async function syncYouTubePlaylists() {
  console.log(`[YouTube Sync] Fetching channel playlists from: ${PLAYLISTS_URL}`);
  
  let playlists = [];

  try {
    const response = await fetch(PLAYLISTS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`YouTube playlists page returned HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const match = html.match(/var ytInitialData = ({.*?});<\/script>/s) || html.match(/ytInitialData\s*=\s*({.+?});/);
    
    if (!match) {
      throw new Error('Could not parse ytInitialData from YouTube response');
    }

    const initialData = JSON.parse(match[1]);

    // Specifically target the channel's Playlists tab
    const tabs = initialData?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
    const plTab = tabs.find(t => t?.tabRenderer?.title === 'Playlists');

    // Recursively search for playlist items in the JSON tree
    function extractPlaylists(obj, list = []) {
      if (!obj || typeof obj !== 'object') return list;

      // Type 1: lockupViewModel
      if (obj.lockupViewModel && obj.lockupViewModel.contentId) {
        const vm = obj.lockupViewModel;
        const id = vm.contentId.replace(/^VL/, '');
        const title = vm?.metadata?.lockupMetadataViewModel?.title?.content;
        
        let itemCount = 'Playlist';
        const overlays = vm?.contentImage?.collectionThumbnailViewModel?.primaryThumbnail?.thumbnailViewModel?.overlays || [];
        for (const overlay of overlays) {
          const text = overlay?.thumbnailOverlayBadgeViewModel?.thumbnailBadges?.[0]?.thumbnailBadgeViewModel?.text;
          if (text) {
            itemCount = text;
            break;
          }
        }

        const sources = vm?.contentImage?.collectionThumbnailViewModel?.primaryThumbnail?.thumbnailViewModel?.image?.sources || [];
        const thumbnail = sources.length > 0 ? sources[sources.length - 1].url : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

        if (id && title) {
          list.push({
            id,
            title,
            description: '',
            itemCount,
            thumbnailUrl: thumbnail,
            url: `https://www.youtube.com/playlist?list=${id}`,
          });
        }
      }

      // Type 2: gridPlaylistRenderer
      if (obj.gridPlaylistRenderer && obj.gridPlaylistRenderer.playlistId) {
        const g = obj.gridPlaylistRenderer;
        const id = g.playlistId;
        const title = g?.title?.runs?.[0]?.text || g?.title?.simpleText || 'Playlist';
        const itemCount = g?.videoCountShortText?.simpleText || g?.videoCountText?.runs?.[0]?.text || 'Playlist';
        const thumbs = g?.thumbnail?.thumbnails || [];
        const thumbnail = thumbs.length > 0 ? thumbs[thumbs.length - 1].url : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

        if (id && title) {
          list.push({
            id,
            title,
            description: '',
            itemCount,
            thumbnailUrl: thumbnail,
            url: `https://www.youtube.com/playlist?list=${id}`,
          });
        }
      }

      // Type 3: playlistRenderer
      if (obj.playlistRenderer && obj.playlistRenderer.playlistId) {
        const p = obj.playlistRenderer;
        const id = p.playlistId;
        const title = p?.title?.simpleText || p?.title?.runs?.[0]?.text || 'Playlist';
        const itemCount = p?.videoCount || p?.videoCountText?.runs?.[0]?.text || 'Playlist';
        const thumbs = p?.thumbnails?.[0]?.thumbnails || [];
        const thumbnail = thumbs.length > 0 ? thumbs[thumbs.length - 1].url : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

        if (id && title) {
          list.push({
            id,
            title,
            description: '',
            itemCount,
            thumbnailUrl: thumbnail,
            url: `https://www.youtube.com/playlist?list=${id}`,
          });
        }
      }

      for (const key of Object.keys(obj)) {
        extractPlaylists(obj[key], list);
      }
      return list;
    }

    // Extract from Playlists tab if available, otherwise search initialData
    const rawPlaylists = extractPlaylists(plTab || initialData);

    // Deduplicate by playlist ID
    const playlistMap = new Map();
    for (const pl of rawPlaylists) {
      if (!playlistMap.has(pl.id)) {
        playlistMap.set(pl.id, pl);
      }
    }

    const uniquePlaylists = Array.from(playlistMap.values());
    console.log(`[YouTube Sync] Found ${uniquePlaylists.length} playlists directly on channel.`);

    // Fetch descriptions for each playlist if missing
    for (const pl of uniquePlaylists) {
      try {
        const plPageRes = await fetch(`https://www.youtube.com/playlist?list=${pl.id}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        });
        if (plPageRes.ok) {
          const plHtml = await plPageRes.text();
          const plMatch = plHtml.match(/var ytInitialData = ({.*?});<\/script>/s) || plHtml.match(/ytInitialData\s*=\s*({.+?});/);
          if (plMatch) {
            const plData = JSON.parse(plMatch[1]);
            const header = plData?.header?.playlistHeaderRenderer;
            const desc = header?.descriptionText?.simpleText || 
                         header?.descriptionText?.runs?.map(r => r.text).join('') ||
                         plData?.microformat?.microformatDataRenderer?.description || '';
            if (desc) {
              pl.description = desc.trim();
            }
          }
        }
      } catch {
        // Continue
      }

      // Default description if still empty
      if (!pl.description) {
        if (pl.id === 'PLS-zY-uxoC_I') {
          pl.description = 'Master Meta Ads step-by-step from Day 1 to Day 30: Business Manager setup, Campaign Objectives, Ad Account setup, Payment methods, and scaling.';
        } else {
          pl.description = 'Complete curated series and step-by-step tutorials by ShariqLogz.';
        }
      }
    }

    if (uniquePlaylists.length > 0) {
      playlists = uniquePlaylists;
    }
  } catch (err) {
    console.warn('[YouTube Sync] Failed to fetch live playlists, using fallback:', err.message);
  }

  // If live fetch didn't yield items, fall back to existing JSON or baseline
  if (playlists.length === 0) {
    if (fs.existsSync(DATA_FILE)) {
      try {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed.playlists) && parsed.playlists.length > 0) {
          playlists = parsed.playlists;
        }
      } catch {
        // Fall back to baseline
      }
    }
    if (playlists.length === 0) {
      playlists = BASELINE_PLAYLISTS;
    }
  }

  const payload = {
    channelId: CHANNEL_ID,
    channelName: 'ShariqLogz',
    channelUrl: `https://www.youtube.com/${CHANNEL_HANDLE}`,
    lastSynced: new Date().toISOString(),
    formattedLastSync: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    }) + ' IST',
    playlistCount: playlists.length,
    playlists,
  };

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`[YouTube Sync] Saved ${playlists.length} playlists to ${DATA_FILE}`);

  const distDir = path.join(rootDir, 'dist', 'data');
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distDir, 'youtube-playlists.json'), JSON.stringify(payload, null, 2), 'utf-8');
    console.log(`[YouTube Sync] Also updated dist/data/youtube-playlists.json`);
  }

  return {
    success: true,
    playlistCount: playlists.length,
    lastSynced: payload.lastSynced,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncYouTubePlaylists()
    .then((res) => {
      console.log('[YouTube Sync] Playlists sync completed:', res);
      process.exit(0);
    })
    .catch((err) => {
      console.error('[YouTube Sync] Error syncing playlists:', err);
      process.exit(1);
    });
}

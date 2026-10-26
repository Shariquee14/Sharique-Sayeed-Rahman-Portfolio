import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CHANNEL_ID = 'UC2cuJbYZ1LE72OhUs52LZHA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const DATA_DIR = path.join(rootDir, 'public', 'data');
const DATA_FILE = path.join(DATA_DIR, 'youtube.json');

function formatDate(isoString) {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'Recent';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recent';
  }
}

export async function syncYouTubeVideos() {
  console.log(`[YouTube Sync] Fetching feed from: ${FEED_URL}`);
  
  const response = await fetch(FEED_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/xml,text/xml,*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`YouTube feed returned HTTP ${response.status}: ${response.statusText}`);
  }

  const xmlText = await response.text();
  if (!xmlText || !xmlText.includes('<feed')) {
    throw new Error('Invalid YouTube feed XML received');
  }

  // Parse entries
  const entryBlocks = xmlText.split('<entry>').slice(1);
  const fetchedVideos = [];

  for (const block of entryBlocks) {
    const idMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || block.match(/<videoId>([^<]+)<\/videoId>/);
    const titleMatch = block.match(/<title>([^<]+)<\/title>/);
    const linkMatch = block.match(/<link[^>]+href=["']([^"']+)["']/);
    const pubMatch = block.match(/<published>([^<]+)<\/published>/);

    if (idMatch && idMatch[1]) {
      const videoId = idMatch[1].trim();
      const rawTitle = titleMatch ? titleMatch[1].trim() : 'Video';
      // Decode HTML entities if any
      const title = rawTitle
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      const linkHref = linkMatch ? linkMatch[1] : '';
      const publishedAt = pubMatch ? pubMatch[1].trim() : new Date().toISOString();

      // Reliable classification:
      // YouTube RSS specifies href="https://www.youtube.com/shorts/..." for Shorts
      // Also check #shorts in title
      const isShort =
        linkHref.includes('/shorts/') ||
        title.toLowerCase().includes('#shorts') ||
        title.toLowerCase().includes('#short');

      const canonicalUrl = isShort
        ? `https://www.youtube.com/shorts/${videoId}`
        : `https://www.youtube.com/watch?v=${videoId}`;

      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      fetchedVideos.push({
        id: videoId,
        title,
        url: canonicalUrl,
        thumbnailUrl,
        publishedAt,
        formattedDate: formatDate(publishedAt),
        isShort,
        type: isShort ? 'short' : 'long',
      });
    }
  }

  console.log(`[YouTube Sync] Found ${fetchedVideos.length} videos in YouTube live feed.`);

  // Load existing data to merge and preserve older videos
  let existingVideos = [];
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed.videos)) {
        existingVideos = parsed.videos;
      }
    } catch (e) {
      console.warn('[YouTube Sync] Could not parse existing youtube.json, starting fresh:', e.message);
    }
  }

  // Merge map keyed by ID: new items update metadata, older items are preserved
  const videoMap = new Map();

  // 1. Add existing videos first
  for (const v of existingVideos) {
    if (v && v.id) {
      videoMap.set(v.id, v);
    }
  }

  // 2. Add or update with newly fetched videos
  let newVideoCount = 0;
  for (const v of fetchedVideos) {
    if (!videoMap.has(v.id)) {
      newVideoCount++;
      console.log(`[YouTube Sync] NEW VIDEO DETECTED: [${v.type.toUpperCase()}] ${v.title} (${v.id})`);
    }
    // Update or insert with fresh data from feed
    videoMap.set(v.id, v);
  }

  // Convert map to array and sort by publication date descending (newest first)
  const allVideos = Array.from(videoMap.values()).sort((a, b) => {
    const timeA = new Date(a.publishedAt).getTime();
    const timeB = new Date(b.publishedAt).getTime();
    return timeB - timeA;
  });

  const payload = {
    channelId: CHANNEL_ID,
    channelName: 'ShariqLogz',
    channelUrl: 'https://www.youtube.com/@Shariqlogz',
    lastSynced: new Date().toISOString(),
    formattedLastSync: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    }) + ' IST',
    totalVideos: allVideos.length,
    shortsCount: allVideos.filter(v => v.isShort).length,
    longCount: allVideos.filter(v => !v.isShort).length,
    videos: allVideos,
  };

  // Ensure public/data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Write to public/data/youtube.json
  fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`[YouTube Sync] Saved ${allVideos.length} total videos to ${DATA_FILE}`);

  // Also write to dist/data/youtube.json if dist directory exists
  const distDir = path.join(rootDir, 'dist', 'data');
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distDir, 'youtube.json'), JSON.stringify(payload, null, 2), 'utf-8');
    console.log(`[YouTube Sync] Also updated dist/data/youtube.json`);
  }

  return {
    success: true,
    newVideoCount,
    totalCount: allVideos.length,
    shortsCount: payload.shortsCount,
    longCount: payload.longCount,
    lastSynced: payload.lastSynced,
  };
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncYouTubeVideos()
    .then((res) => {
      console.log('[YouTube Sync] Synchronization completed successfully:', res);
      process.exit(0);
    })
    .catch((err) => {
      console.error('[YouTube Sync] Error during synchronization:', err);
      process.exit(1);
    });
}

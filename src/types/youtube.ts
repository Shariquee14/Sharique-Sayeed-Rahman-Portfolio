export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  formattedDate: string;
  isShort: boolean;
  type: 'short' | 'long';
}

export interface YouTubeChannelInfo {
  name: string;
  handle: string;
  channelId: string;
  url: string;
  description: string;
  subscriberCount?: string;
  videoCount?: string;
}

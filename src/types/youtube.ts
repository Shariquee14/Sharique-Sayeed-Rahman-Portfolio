export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  itemCount: string;
  thumbnailUrl: string;
  url: string;
}

export interface YouTubeChannelInfo {
  name: string;
  handle: string;
  channelId: string;
  url: string;
  description: string;
  subscriberCount?: string;
  playlistCount?: string;
}

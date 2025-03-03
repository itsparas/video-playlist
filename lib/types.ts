export interface Video {
  id: string;
  title: string;
  description?: string;
  duration: number;
  category?: string;
  url: string;
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  videos: PlaylistVideo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaylistVideo {
  id: string;
  videoId: string;
  playlistId: string;
  order: number;
  video: Video;
}
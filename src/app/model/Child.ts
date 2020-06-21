export interface Child {
  id: string;
  parent: string;
  isDir: boolean;
  title: string;
  album: string;
  artist: string;
  track: number;
  year: number;
  genre: string;
  coverArt: string;
  size: number;
  contentType: string;
  suffix: string;
  transcodedContentType: string;
  transcodedSuffix: string;
  duration: number;
  bitRate: number;
  path: string;
  isVideo: boolean;
  playCount: number;
  created: Date;
  albumId: string;
  type: string;
}

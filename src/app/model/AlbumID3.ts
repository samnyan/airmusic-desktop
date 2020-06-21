import {Child} from './Child';

export interface AlbumID3 {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt: string;
  songCount: number;
  duration: number;
  created: Date;
  genre: string;
}

export interface AlbumWithSongsID3 extends AlbumID3 {
  song: Child[];
}

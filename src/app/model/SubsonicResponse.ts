import {AlbumID3, AlbumWithSongsID3} from './AlbumID3';

export interface SubsonicError {
  code: number;
  message: string;
}

export interface AlbumList2 {
  album: AlbumID3[];
}

export interface SubsonicResponse {
  status: string;
  version: string;
  error?: SubsonicError;
  albumList2?: AlbumList2;
  album?: AlbumWithSongsID3;
}

export interface ResponseRoot {
  'subsonic-response': SubsonicResponse;
}


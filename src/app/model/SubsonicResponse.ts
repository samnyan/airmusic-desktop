import {AlbumID3} from './AlbumID3';

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
}

export interface ResponseRoot {
  'subsonic-response': SubsonicResponse;
}


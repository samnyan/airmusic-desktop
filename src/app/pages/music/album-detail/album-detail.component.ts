import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../core/services/api/api.service';
import {AlbumWithSongsID3} from '../../../model/AlbumID3';
import {HttpParams} from '@angular/common/http';
import {MusicPlayerService} from '../../../core/services/music-player/music-player.service';
import {Child} from '../../../model/Child';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  album: AlbumWithSongsID3;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private music: MusicPlayerService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      this.loadAlbum(id);
    })
  }

  loadAlbum(id: string) {
    const param = new HttpParams().set('id', id);
    this.api.get('getAlbum', {params: param}).subscribe(
      a => this.album = a.album
    )
  }

  playSingle(music: Child) {
    this.music.replaceAndPlay([music]);
  }

  playAlbum() {
    this.music.replaceAndPlay(this.album.song);
  }
}

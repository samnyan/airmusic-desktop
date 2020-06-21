import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../core/services/api/api.service';
import {AlbumWithSongsID3} from '../../../model/AlbumID3';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  album: AlbumWithSongsID3;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
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

}

import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../core/services/api/api.service';
import {AuthenticationService} from '../../core/services/auth/authentication.service';
import {AlbumID3} from '../../model/AlbumID3';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  result = '';

  albumList: AlbumID3[];

  constructor(
    private api: ApiService,
    private auth: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    if (this.auth.isLogin()) {
      const param = new HttpParams().set('type', 'frequent');
      this.api.get('getAlbumList2', {params: param}).subscribe(
        data => this.albumList = data.albumList2.album
      );
    }

  }

}

import {Component, OnInit} from '@angular/core';
import {AuthenticationService, User} from '../../../core/services/auth/authentication.service';
import {MusicPlayerService} from '../../../core/services/music-player/music-player.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  user: User = null;

  constructor(
    private auth: AuthenticationService,
    private musicService: MusicPlayerService
  ) {
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(u => {
      this.user = u;
    })
  }

  logout() {
    this.auth.logout();
  }

}

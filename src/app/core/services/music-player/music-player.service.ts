import {ElementRef, Injectable} from '@angular/core';
import {Child} from '../../../model/Child';
import {BehaviorSubject} from 'rxjs';
import {UserConfigService} from '../config/user-config.service';
import {AppConfig} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  baseString = '/rest/stream?v=' + AppConfig.version + '&c=' + AppConfig.client + '&id=';

  player: ElementRef<HTMLAudioElement>;

  currentMusicSubject = new BehaviorSubject<Child>(null);
  currentMusic = this.currentMusicSubject.asObservable();

  constructor(
    private config: UserConfigService
  ) {
  }

  bindPlayer(player: ElementRef<HTMLAudioElement>) {
    this.player = player;
    this.player.nativeElement.addEventListener('ended', () => this.handlePlayEnd())
  }

  replaceAndPlay(music: Child) {
    this.currentMusicSubject.next(music);
    const url = this.getSteamUrl(music.id);
    this.play(url);
  }

  getSteamUrl(id: string | number) {
    if (typeof id == 'number') {
      id = String(id);
    }
    const host = this.config.get('host');
    return host + this.baseString + id;
  }

  play(url: string) {
    this.player.nativeElement.pause();
    this.player.nativeElement.src = url;
    this.player.nativeElement.play();
  }

  handlePlayEnd() {
    return true;
  }
}

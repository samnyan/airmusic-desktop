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

  private currentMusicSubject = new BehaviorSubject<Child>(null);
  currentMusic = this.currentMusicSubject.asObservable();

  private currentIndexSubject = new BehaviorSubject<number>(-1);
  currentIndex = this.currentMusicSubject.asObservable();

  private playListSubject = new BehaviorSubject<Child[]>([]);
  playList = this.playListSubject.asObservable();

  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying = this.isPlayingSubject.asObservable();

  isScrobbled = false;
  private currentTimeSubject = new BehaviorSubject<number>(0);
  currentTime = this.currentTimeSubject.asObservable();

  private durationSubject = new BehaviorSubject<number>(0.01);
  duration = this.durationSubject.asObservable();


  // TODO: Remember the last play list in localStorage

  constructor(
    private config: UserConfigService
  ) {
  }

  public get currentMusicValue(): Child {
    return this.currentMusicSubject.value;
  }

  public get currentIndexValue(): number {
    return this.currentIndexSubject.value;
  }

  public set currentIndexValue(val) {
    this.currentIndexSubject.next(val);
  }

  public get playListValue(): Child[] {
    return this.playListSubject.value;
  }

  public set playListValue(val) {
    this.playListSubject.next(val);
  }

  public get isPlayingValue(): boolean {
    return this.isPlayingSubject.value;
  }

  public set isPlayingValue(val) {
    this.isPlayingSubject.next(val);
  }

  public get currentTimeValue(): number {
    return this.currentTimeSubject.value;
  }

  public set currentTimeValue(val) {
    this.currentTimeSubject.next(val);
  }

  public get durationValue(): number {
    return this.durationSubject.value;
  }

  public set durationValue(val) {
    this.durationSubject.next(val);
  }

  bindPlayer(player: ElementRef<HTMLAudioElement>) {
    this.player = player;
    this.player.nativeElement.addEventListener('ended', () => this.handlePlayEnd());
    this.player.nativeElement.addEventListener('playing', () => {
      this.isPlayingValue = true;
      this.durationValue = Math.floor(this.player.nativeElement.duration);
    });
    this.player.nativeElement.addEventListener('pause', () => {
      this.isPlayingValue = false;
    });
    this.player.nativeElement.addEventListener('ended', () => {
      this.isPlayingValue = false;
    });
    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.currentTimeValue = Math.floor(this.player.nativeElement.currentTime);
      this.handleTimeUpdate();
    });
  }

  replaceAndPlay(musicList: Child[]) {
    // Replace the whole playlist
    this.playListValue = musicList;
    console.log('Play list updated', this.playList);
    // Set the index
    this.currentIndexValue = 0;
    this.playIndex();
  }

  append(musicList: Child[]) {
    this.playListValue = this.playListValue.concat(musicList);
  }

  // This maybe useless
  appendAndPlay(musicList: Child[]) {
    const c = this.currentIndexValue;
    // Replace the whole playlist
    this.playListValue = this.playListValue.concat(musicList);
    // Set the index
    this.currentIndexValue = c + 1;
    this.playIndex();
  }

  getSteamUrl(id: string | number) {
    if (typeof id == 'number') {
      id = String(id);
    }
    const host = this.config.get('host');
    return host + this.baseString + id;
  }

  // Play at the current index
  playIndex() {
    console.log('Current index', this.currentIndexValue);
    console.log('Current playing', this.playListValue[this.currentIndexValue]);
    this.currentMusicSubject.next(this.playListValue[this.currentIndexValue]);
    const url = this.getSteamUrl(this.playListValue[this.currentIndexValue].id);
    this.play(url);
  }

  // Play by url
  play(url: string) {
    this.isScrobbled = false;
    this.player.nativeElement.pause();
    this.player.nativeElement.src = url;
    this.player.nativeElement.play();
  }

  handleTimeUpdate() {
    // Update current time,
    // Check last fm submit
    if (!this.isScrobbled && (this.currentTimeValue >= this.durationValue / 2)) {
      this.isScrobbled = true;
      console.log('Scrobble');
    }
  }

  // Use to handle user manually click button
  playNext() {
    if (this.currentIndexValue < this.playListValue.length - 1) {
      this.currentIndexValue += 1;
      this.playIndex();
    }
  }

  playPrevious() {
    if (this.currentIndexValue > 0) {
      this.currentIndexValue -= 1;
      this.playIndex();
    }
  }

  // Use to handle player event
  private handleNextSong() {
    // Check if the play list ended
    if (this.currentIndexValue < this.playListValue.length - 1) {
      this.currentIndexValue += 1;
      this.playIndex();
    } else {
      this.currentMusicSubject.next(null);
      this.currentIndexValue = -1;
    }
  }

  private handlePreviousSong() {
    // Check if the play list has previous song
    if (this.currentIndexValue > 0) {
      this.currentIndexValue -= 1;
      this.playIndex();
    } else {
      this.currentMusicSubject.next(null);
      this.currentIndexValue = -1;
    }
  }

  // Handle the play end event
  handlePlayEnd() {
    this.handleNextSong();
    return true;
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicPlayerService} from '../../../core/services/music-player/music-player.service';
import {Child} from '../../../model/Child';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  @ViewChild('musicPlayer', {static: true}) player: ElementRef<HTMLAudioElement>;

  currentMusic: Child;

  isPlaying = false;
  currentTime = 0;
  volume = 0.1;
  duration = 0.01;

  constructor(private musicService: MusicPlayerService) {
  }

  ngOnInit(): void {
    this.musicService.bindPlayer(this.player);
    this.bindEvent();
    this.musicService.currentMusic.subscribe(music => this.currentMusic = music);
  }

  bindEvent() {
    this.player.nativeElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
    this.player.nativeElement.addEventListener('pause', () => {
      this.isPlaying = false;
    });
    this.player.nativeElement.addEventListener('ended', () => {
      this.isPlaying = false;
    });
    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.player.nativeElement.currentTime);
    });
  }


  togglePlayPause() {
    if (this.isPlaying) {
      this.player.nativeElement.pause();
    } else {
      this.player.nativeElement.play();
    }
  }

  currTimePosChanged(event: any) {
    this.player.nativeElement.currentTime = event.value;
  }
}

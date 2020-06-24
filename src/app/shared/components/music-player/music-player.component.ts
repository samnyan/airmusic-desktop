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
  }

  bindEvent() {
    this.musicService.isPlaying.subscribe(val => this.isPlaying = val);
    this.musicService.duration.subscribe(val => this.duration = val);
    this.musicService.currentTime.subscribe(val => this.currentTime = val);
    this.musicService.currentMusic.subscribe(music => this.currentMusic = music);
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

  playPrevious() {
    this.musicService.playPrevious();
  }

  playNext() {
    this.musicService.playNext()
  }
}

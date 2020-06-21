import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {FormsModule} from '@angular/forms';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MusicPlayerComponent} from './components/music-player/music-player.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule, MatButtonModule, MatMenuModule, MatIconModule, MatSliderModule, CoreModule],
  exports: [TranslateModule, FormsModule, SideBarComponent],
  declarations: [SideBarComponent, MusicPlayerComponent]
})
export class SharedModule {
}

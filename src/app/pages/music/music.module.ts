import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlbumDetailComponent} from './album-detail/album-detail.component';
import {MusicRoutingModule} from './music-routing.module';
import {MatCardModule} from '@angular/material/card';
import {CoreModule} from '../../core/core.module';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    MatCardModule,
    CoreModule,
    MatListModule,
    FlexModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
  ]
})
export class MusicModule {
}

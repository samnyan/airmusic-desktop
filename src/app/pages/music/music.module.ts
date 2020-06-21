import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlbumDetailComponent} from './album-detail/album-detail.component';
import {MusicRoutingModule} from './music-routing.module';
import {MatCardModule} from '@angular/material/card';
import {CoreModule} from '../../core/core.module';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    MatCardModule,
    CoreModule,
    MatListModule,
    FlexModule
  ]
})
export class MusicModule {
}

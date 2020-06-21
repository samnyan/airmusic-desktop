import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './services/message/message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {IdToCoverArtPipe} from './pipes/id-to-cover-art.pipe';
import {ChildToCoverArtPipe} from './pipes/child-to-cover-art.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  declarations: [MessageComponent, IdToCoverArtPipe, ChildToCoverArtPipe],
  exports: [MessageComponent, IdToCoverArtPipe, ChildToCoverArtPipe]
})
export class CoreModule {
}

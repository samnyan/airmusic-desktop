import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './services/message/message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {IdToCoverArtPipe} from './pipes/id-to-cover-art.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  declarations: [MessageComponent, IdToCoverArtPipe],
  exports: [MessageComponent, IdToCoverArtPipe]
})
export class CoreModule {
}

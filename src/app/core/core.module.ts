import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './services/message/message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class CoreModule {
}

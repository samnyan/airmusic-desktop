import {Injectable} from '@angular/core';
import {MessageComponent} from './message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private messageComponent: MessageComponent) {
  }

  notice(message: string) {
    this.messageComponent.openSnackBar(message);
  }
}

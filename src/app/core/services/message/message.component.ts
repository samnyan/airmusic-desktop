import {Component, Injectable, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-message',
  template: `

  `
})
export class MessageComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  public openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }


}

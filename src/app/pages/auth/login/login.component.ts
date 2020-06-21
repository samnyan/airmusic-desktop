import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../core/services/auth/authentication.service';
import {MessageService} from '../../../core/services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    host: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private auth: AuthenticationService,
    private message: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.valid) {
      const val = this.loginForm.value;
      if (!(val.host.startsWith('http://') || val.host.startsWith('https://'))) {
        val.host = 'http://' + val.host;
        this.loginForm.setValue(val);
      }
      this.auth.login(this.loginForm.value).subscribe(data => {
        console.log(data);
        this.message.notice('Login successful')
      }, error => {
        console.log(error);
        const resp = error.error;
        this.message.notice(resp.message);
      })
    }
  }
}

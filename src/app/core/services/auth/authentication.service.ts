import {Injectable} from '@angular/core';
import {UserConfigService} from '../config/user-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ElectronService} from '..';
import {switchMap} from 'rxjs/operators';
import {HttpOptions} from '../api/api.service';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {SubsonicResponse} from '../../../model/SubsonicResponse';
import {AppConfig} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private e: ElectronService,
    private http: HttpClient,
    private config: UserConfigService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(info: LoginInfo): Observable<SubsonicResponse> {
    const crypto = this.e.remote.require('crypto');
    const salt = crypto.randomBytes(20).toString('hex');
    const token = crypto.createHash('md5').update(info.password + salt).digest('hex');
    const host = info.host.trim().replace(/\/+$/, "");
    const options = mergeOption({username: info.username, salt: salt, token: token}, null)
    return this.http.get(host + '/rest/ping', options).pipe(
      switchMap(data => {
        const status = data['subsonic-response'].status;
        if (status === 'ok') {
          this.config.set('host', host);
          this.config.set('username', info.username);
          this.config.set('salt', salt);
          this.config.set('token', token);
          this.currentUserSubject.next(this.getUser());
          return of(data['subsonic-response']);
        } else {
          return throwError(data['subsonic-response']);
        }
      })
    )
  }

  logout() {
    this.config.set('host', null);
    this.config.set('username', null);
    this.config.set('salt', null);
    this.config.set('token', null);
    this.currentUserSubject.next(null);
  }

  isLogin() {
    return this.config.get('username') != null;
  }

  getUser(): User | null {
    const user = {
      username: this.config.get('username'),
      token: this.config.get('token'),
      salt: this.config.get('salt')
    }
    if (user.username == null || user.token == null || user.salt == null) {
      return null;
    }
    return user;
  }

}

export function mergeOption(auth: User, options?: HttpOptions) {
  if (options == null) {
    options = {};
  }
  if (options.params == null) {
    options.params = new HttpParams();
  }

  options.params = options.params.set('u', auth.username);
  options.params = options.params.set('t', auth.token);
  options.params = options.params.set('s', auth.salt);
  options.params = options.params.set('v', AppConfig.version);
  options.params = options.params.set('c', AppConfig.client);
  options.params = options.params.set('f', 'json');
  return options;
}

export interface User {
  username: string;
  token: string;
  salt: string;
}

export interface LoginInfo {
  host: string;
  username: string;
  password: string
}

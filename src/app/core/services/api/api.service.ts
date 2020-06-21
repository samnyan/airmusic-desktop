import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserConfigService} from '../config/user-config.service';
import {Observable, of, throwError} from 'rxjs';
import {AuthenticationService, mergeOption} from '../auth/authentication.service';
import {switchMap} from 'rxjs/operators';
import {ResponseRoot, SubsonicResponse} from '../../../model/SubsonicResponse';
import {MessageService} from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private config: UserConfigService,
    private auth: AuthenticationService,
    private message: MessageService
  ) {
  }

  get(url: string, options?: HttpOptions): Observable<SubsonicResponse> {
    options = mergeOption(this.auth.getUser(), options);
    return this.http.get<ResponseRoot>(this.getHost() + '/rest/' + url, options).pipe(
      switchMap(data => {
        // Check if the response body contains error field, since the server only send 200 status code.
        if (data['subsonic-response'].error) {
          this.message.notice('Request ' + url + ' Error: ' + data['subsonic-response'].error.message);
          return throwError(data['subsonic-response']);
        } else {
          return of(data['subsonic-response']);
        }
      })
    );
  }

  getRaw = this.http.get;

  getHost(): string {
    const host = this.config.get('host');
    return host ? host : 'http://localhost:8080';
  }

}

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

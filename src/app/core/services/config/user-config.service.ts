import {Injectable} from '@angular/core';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  config: any;
  app;
  fs: typeof fs;

  constructor() {
    this.config = this.parseConfig();
    console.log('Read config', this.config);
  }

  get(key) {
    try {
      return this.config[key];
    } catch (e) {
      return null;
    }
  }

  set(key, val) {
    this.config[key] = val;
    localStorage.setItem('config', JSON.stringify(this.config));
  }

  parseConfig() {
    try {
      const c = localStorage.getItem('config');
      if (c == null) {
        const config = DEFAULT_CONFIG;
        localStorage.setItem('config', JSON.stringify(config));
        return config;
      }
      return JSON.parse(localStorage.getItem('config'));
    } catch (e) {
      const config = DEFAULT_CONFIG;
      localStorage.setItem('config', JSON.stringify(config));
      return config;
    }
  }
}

const DEFAULT_CONFIG = {
  host: 'http://localhost:8080',
  username: null,
  salt: null,
  token: null,
}

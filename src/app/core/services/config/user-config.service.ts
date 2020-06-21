import {Injectable} from '@angular/core';
import {ElectronService} from '../electron/electron.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  configPath: string;
  config;
  app;
  fs: typeof fs;

  constructor(e: ElectronService) {
    this.fs = e.fs;
    this.configPath = path.join(e.remote.app.getPath('userData'), 'config.json')
    console.log('Config Path: ', this.configPath);
    this.config = this.parseConfig();
    console.log('Read config', this.config);
  }

  get(key) {
    return this.config[key];
  }

  set(key, val) {
    this.config[key] = val;
    this.fs.writeFileSync(this.configPath, JSON.stringify(this.config));
  }

  parseConfig() {
    try {
      return JSON.parse(this.fs.readFileSync(this.configPath).toString('utf8'));
    } catch (e) {
      const config = DEFAULT_CONFIG;
      this.fs.writeFileSync(this.configPath, JSON.stringify(config));
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

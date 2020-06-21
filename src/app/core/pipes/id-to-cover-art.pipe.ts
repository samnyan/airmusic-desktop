import {Pipe, PipeTransform} from '@angular/core';
import {UserConfigService} from '../services/config/user-config.service';
import {AppConfig} from '../../../environments/environment';

@Pipe({
  name: 'idToCoverArt'
})
export class IdToCoverArtPipe implements PipeTransform {

  baseString = '/rest/getCoverArt?v=' + AppConfig.version + '&c=' + AppConfig.client + '&id=';

  constructor(private config: UserConfigService) {
  }

  transform(value: number | string | undefined | null, size?: number | string): unknown {
    if (value == null) {
      return '/assets/icons/no-album-art.svg';
    }
    if (typeof value == 'number') {
      value = String(value);
    }
    if (typeof size == 'string') {
      size = Number(size);
    }
    const host = this.config.get('host');
    let url = host + this.baseString + value;
    return size ? url + '&size=' + size : url;
  }

}

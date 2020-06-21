import {Pipe, PipeTransform} from '@angular/core';
import {UserConfigService} from '../services/config/user-config.service';
import {AppConfig} from '../../../environments/environment';

const baseString = '/rest/getCoverArt?v=' + AppConfig.version + '&c=' + AppConfig.client + '&id=';

@Pipe({
  name: 'idToCoverArt'
})
export class IdToCoverArtPipe implements PipeTransform {

  constructor(private config: UserConfigService) {
  }

  transform(value: number | string | undefined | null, size?: number | string): unknown {
    return getAlbumArtUrl(value, this.config, size);
  }

}

export function getAlbumArtUrl(value, config?: UserConfigService, size?) {
  if (value == null) {
    return '/assets/icons/no-album-art.svg';
  }
  if (typeof value == 'number') {
    value = String(value);
  }
  if (typeof size == 'string') {
    size = Number(size);
  }
  const host = config.get('host');
  let url = host + baseString + value;
  return size ? url + '&size=' + size : url;
}

import {Pipe, PipeTransform} from '@angular/core';
import {Child} from '../../model/Child';
import {getAlbumArtUrl} from './id-to-cover-art.pipe';
import {UserConfigService} from '../services/config/user-config.service';

@Pipe({
  name: 'childToCoverArt'
})
export class ChildToCoverArtPipe implements PipeTransform {

  constructor(private config: UserConfigService) {
  }

  transform(value?: Child, size?): string {
    if (value == null) {
      return '/assets/icons/no-album-art.svg';
    } else {
      return getAlbumArtUrl(value.coverArt, this.config, size);
    }
  }

}

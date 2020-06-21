import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/services/api/api.service';
import {UserConfigService} from '../core/services/config/user-config.service';
import {ElectronService} from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  result = '';

  constructor(
    private e: ElectronService,
    private api: ApiService,
    private config: UserConfigService
  ) {
  }

  ngOnInit(): void {

  }

}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeRoutingModule} from './pages/home/home-routing.module';
import {LoginComponent} from './pages/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

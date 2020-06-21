import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeRoutingModule} from './home/home-routing.module';
import {LoginComponent} from './pages/auth/login/login.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
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

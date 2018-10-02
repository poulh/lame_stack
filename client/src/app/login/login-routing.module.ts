import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: 'signup', component: LoginComponent, data: { title: extract('Signup') } },
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  { path: 'logout', component: LoginComponent, data: { title: extract('Login') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }

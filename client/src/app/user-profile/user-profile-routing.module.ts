import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';

import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'user/:id', component: UserProfileComponent, data: { title: extract('User Profile') } },
    { path: 'user', component: UserProfileComponent, data: { title: extract('User Profile') } }
  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }

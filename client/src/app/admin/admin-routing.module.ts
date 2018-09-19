import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'admin', component: AdminComponent, data: { title: extract('Admin') } }
  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

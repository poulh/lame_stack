import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { GoBackComponent } from './go-back/go-back.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    GoBackComponent
  ],
  exports: [
    LoaderComponent,
    GoBackComponent
  ]
})
export class SharedModule { }

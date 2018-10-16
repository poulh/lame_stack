import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { GoBackComponent } from './go-back/go-back.component';
import { PhoneNumberPipe } from './pipes/phoneNumber.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    GoBackComponent,
    PhoneNumberPipe
  ],
  exports: [
    LoaderComponent,
    GoBackComponent,
    PhoneNumberPipe
  ]
})
export class SharedModule { }

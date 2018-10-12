import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/shared';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }

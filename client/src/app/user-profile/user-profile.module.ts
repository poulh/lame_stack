import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    UserProfileRoutingModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }

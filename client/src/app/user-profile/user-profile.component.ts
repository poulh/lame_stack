import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LoopBackAuth } from '../../../sdk/services/core';
import { RegisteredUser } from '../../../sdk/models';
import { RegisteredUserApi } from '../../../sdk/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  isLoading = false;
  error: string;
  oldUser: RegisteredUser;
  @Input() user: RegisteredUser;

  @Input() currentPassword: string = "";
  @Input() newPassword: string = "";

  constructor(
    protected auth: LoopBackAuth,
    private route: ActivatedRoute,
    private userApi: RegisteredUserApi,

    private location: Location) { }

  ngOnInit() {
    this.getUser();
  }

  setUserModel(user: RegisteredUser, setLocal: boolean) {
    this.user = user;
    this.oldUser = new RegisteredUser(user);
    if (setLocal) {
      this.auth.setUser(user); // this updates local cache
    }
    this.isLoading = false;
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const updateLoggedInUser = (id != null);

    this.isLoading = true;

    if (updateLoggedInUser) {
      this.userApi.findById(id).subscribe((user: RegisteredUser) => {
        this.setUserModel(user, updateLoggedInUser);
      })
    } else {
      let user = new RegisteredUser();
      this.setUserModel(user, updateLoggedInUser);
    }
  }

  noUserChanges(): boolean {
    const noChanges = JSON.stringify(this.user) === JSON.stringify(this.oldUser);
    return noChanges;
  }

  updateUser(): void {
    this.isLoading = true;
    const updateLoggedInUser = (this.user.id != null);
    if (updateLoggedInUser) {
      this.userApi.patchAttributes(this.user.id, this.user).subscribe((user: RegisteredUser) => {
        return this.setUserModel(user, updateLoggedInUser);
      });
    } else {
      this.userApi.create(this.user).subscribe((user: RegisteredUser) => {
        return this.setUserModel(user, updateLoggedInUser);
      });
    }
  }

  deleteUser(): void {
    this.userApi.deleteById<Event>(this.user.id).subscribe(user => {
      this.goBack();
    });
  }

  changePassword(): void {
    this.userApi.changePassword(this.currentPassword, this.newPassword).subscribe(foo => {
      console.log(foo);
    }, error => {
      console.log(`change password error: ${error}`);
      this.error = error;
    })
  }

  goBack(): void {
    this.location.back();
  }
}

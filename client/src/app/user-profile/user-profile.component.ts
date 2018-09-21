import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '@app/core';
import { RoleChecker } from '@app/shared';

import { LoopBackAuth } from '../../../sdk/services/core';
import { RegisteredUser } from '../../../sdk/models';
import { RegisteredUserApi } from '../../../sdk/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  roleChecker: RoleChecker;

  isLoading = false;
  error: string;
  oldUser: RegisteredUser;
  @Input() user: RegisteredUser;

  @Input() currentPassword: string = "";
  @Input() newPassword: string = "";

  constructor(
    protected auth: LoopBackAuth,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userApi: RegisteredUserApi,
    private location: Location) {
    this.roleChecker = new RoleChecker(userApi);
  }

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

    this.isLoading = true;

    if (id != null) {
      this.userApi.findById(id).subscribe((user: RegisteredUser) => {
        this.setUserModel(user, this.editingSelf());
      })
    } else {
      let user = new RegisteredUser();
      this.setUserModel(user, this.editingSelf());
    }
  }

  editingSelf(): boolean {
    const credentials = this.authenticationService.credentials;
    return this.user ? (credentials.id == this.user.id) : false;
  }

  noUserChanges(): boolean {
    const noChanges = JSON.stringify(this.user) === JSON.stringify(this.oldUser);
    return noChanges;
  }

  updateUser(): void {
    this.isLoading = true;

    if (this.user.id != null) {
      this.userApi.patchAttributes(this.user.id, this.user).subscribe((user: RegisteredUser) => {
        return this.setUserModel(user, this.editingSelf());
      });
    } else {
      this.userApi.create(this.user).subscribe((user: RegisteredUser) => {
        return this.setUserModel(user, this.editingSelf());
      });
    }
  }

  canDelete(): boolean {

    //you cannot delete yourself
    if (this.editingSelf()) {
      return false;
    }

    return this.roleChecker.is("admin");
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

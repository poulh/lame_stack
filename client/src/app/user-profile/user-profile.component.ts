import { Component, OnInit } from '@angular/core';
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
  user: RegisteredUser;

  constructor(
    protected auth: LoopBackAuth,
    private route: ActivatedRoute,
    private userApi: RegisteredUserApi,

    private location: Location) { }

  ngOnInit() {
    this.getUser();
  }


  setUserModel(user: RegisteredUser) {

    this.user = user;
    this.oldUser = new RegisteredUser(user);
    this.auth.setUser(user); // this updates local cache

    this.isLoading = false;
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;

      this.userApi.findById(id).subscribe((user: RegisteredUser) => {
        this.setUserModel(user);
      })
    } else {
      let user = new RegisteredUser();
      this.setUserModel(user);
    }
  }

  noUserChanges(): boolean {
    const noChanges = JSON.stringify(this.user) === JSON.stringify(this.oldUser);
    return noChanges;
  }

  updateUser(): void {
    this.isLoading = true;
    if (this.user.id) {
      this.userApi.patchAttributes(this.user.id, this.user).subscribe((user: RegisteredUser) => {
        return this.setUserModel(user);
      });
    } else {
      this.userApi.create(this.user).subscribe(user => {
        return this.setUserModel(user);
      });
    }
  }

  deleteUser(): void {
    this.userApi.deleteById<Event>(this.user.id).subscribe(user => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}

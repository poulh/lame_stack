import { Component, OnInit } from '@angular/core';

import { RegisteredUser } from '../../../sdk/models';
import { RegisteredUserApi } from '../../../sdk/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  isLoading = false;
  users: RegisteredUser[];

  constructor(
    private userApi: RegisteredUserApi) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;
    const filter = {
      order: 'lastName ASC'
    };

    this.userApi.find<RegisteredUser>(filter).subscribe(users => {
      this.users = users;
      this.isLoading = false;
    });
  }

  newUserClick(): void {

  }
}

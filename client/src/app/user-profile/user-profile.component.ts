import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { finalize, merge } from 'rxjs/operators';

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

  userForm: FormGroup;
  passwordForm: FormGroup;
  userRoleForm: FormGroup;
  // userRoleValues: { [key: string]: number; } = {};

  @Input() user: RegisteredUser;

  constructor(
    protected auth: LoopBackAuth,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userApi: RegisteredUserApi,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.roleChecker = new RoleChecker(userApi);
  }

  ngOnInit() {
    // this.initUserRoleForm();
    this.initUserForm();
    this.initPasswordForm();
  }

  initUserForm(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')

    const form = {
      id: id != null ? [''] : null,
      accountId: id != null ? [''] : null,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: id != null ? null : ['', Validators.required] //if no id then show password and its required.
    };
    console.log(form);

    this.userForm = this.formBuilder.group(form);

    if (id != null) {
      this.setLoading(true);
      this.userApi.findById(id)
        .pipe(finalize(() => this.setLoading(false)))
        .subscribe((user: RegisteredUser) => {
          this.userForm.reset(user);

          //      this.setUserRoleForm(user.id);
        });
    }
  }

  initUserRoleForm(): void {
    const form = {
      admin: [false]
    };

    this.userRoleForm = this.formBuilder.group(form);
  }

  initPasswordForm(): void {
    const form = {
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    };

    this.passwordForm = this.formBuilder.group(form);
  }

  editingSelf(): boolean {
    const credentials = this.authenticationService.credentials;
    if (this.userForm.controls.id) {
      return credentials.id === this.userForm.controls.id.value;
    }
    return false;
  }

  setLoading(val: boolean): void {
    this.isLoading = val;
  }

  setUserRoleForm(id: any): void {
    this.setLoading(true);
    //  this.userRoleValues = {};
    this.userApi.getRoles(id)
      .pipe(finalize(() => {
        this.setLoading(false);

      }))
      .subscribe((roles: [any]) => {
        /*
        roles.forEach(role => {
          const name = role.name;
          if (this.userRoleForm.get(name)) {
            this.userRoleValues[name] = role.id;
            this.userRoleForm.setValue({ [name]: true })
          }
        });

        console.log(this.userRoleValues);
        */
        //replaceState replaces the url, but does not reload page. 
        //it also replaces top of history with this url ( to keep 'go back' working )
      });
  }

  updateOrCreateUser(): void {
    this.setLoading(true);

    /*
    console.log(this.userForm.value);
    const userRoles = this.userRoleForm.value;

    let userRoleSubmit: { [key: number]: number; } = {};
    for (let userRoleName in userRoles) {
      const roleId = this.userRoleValues[userRoleName];
      userRoleSubmit[roleId] = userRoles[userRoleName];
    }
*/

    //const params = Object.assign({}, this.userForm.value, { roles: this.userRoleForm.value });
    //const params = Object.assign({}, this.userForm.value, { roles: userRoleSubmit });

    this.userApi.patchOrCreateWithRoles(this.userForm.value)
      .pipe(finalize(() => {
        this.setLoading(false);

      })).subscribe((user: RegisteredUser) => {
        console.log(user);
        this.userForm.reset(user);
        this.goBack();
        //updates url without reloading page
        //this.location.replaceState(`/user/${user.id}`);

      });
  }

  canDelete(): boolean {
    //you cannot delete yourself
    if (this.editingSelf()) {
      return false;
    }

    return this.roleChecker.is("admin");
  }

  deleteUser(): void {
    this.userApi.deleteById<Event>(this.userForm.controls.id.value).pipe(finalize(() => this.setLoading(false)))
      .subscribe(user => {
        this.goBack();
      });
  }

  changePassword(): void {
    this.userApi.changePassword(
      this.passwordForm.get('currentPassword').value,
      this.passwordForm.get('newPassword').value)
      .pipe(finalize(() => {
        this.setLoading(false);
        this.passwordForm.reset();
      }))
      .subscribe(() => {
      }, error => {

        console.log(`change password error: ${error}`);
        this.error = error;
      })
  }

  goBack(): void {
    this.location.back();
  }
}

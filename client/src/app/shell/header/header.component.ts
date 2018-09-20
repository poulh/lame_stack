import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, I18nService } from '@app/core';
import { RegisteredUserApi } from '../../../../sdk';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean;
  accountName: string;

  menuHidden = true;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private registeredUserApi: RegisteredUserApi,
    private i18nService: I18nService) { }

  ngOnInit() {
    this.getAccount();
    this.getIsAdmin();
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  getIsAdmin(): void {
    this.registeredUserApi.hasRole("admin").subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  get fullName(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.firstName + " " + credentials.lastName : null;
  }

  get userid(): any | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.id : null;
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  getAccount(): void {
    const credentials = this.authenticationService.credentials;

    this.registeredUserApi.getAccount(credentials.id, true).subscribe(account => {
      console.log(account);
      this.accountName = account.name;
    })

  }
}

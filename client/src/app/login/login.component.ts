import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';

import { AccessToken } from '../../../sdk';
import { RegisteredUser } from '../../../sdk/models';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  signupForm: FormGroup;
  loginForm: FormGroup;
  isLoading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.createSignupForm();
    this.createLoginForm();
  }

  login() {
    this.isLoading = true;
    this.doLogin(this.loginForm.value);
  }

  doLogin(values: any): void {
    this.isLoading = true;
    this.authenticationService.login(values)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe((token: AccessToken) => {
        console.log(token);
        log.debug(`${token.user} successfully logged in`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }

  signup() {
    this.isLoading = true;

    this.authenticationService.signup(this.signupForm.value)
      .pipe(finalize(() => {
        this.signupForm.markAsPristine();
        this.doLogin(this.signupForm.value);
        this.isLoading = false;
      }))
      .subscribe((user: RegisteredUser) => {
        log.debug(`${user.id} successfully signed up`);
      }, error => {
        log.debug(`Signup error: ${error}`);
        this.error = error;
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  private createSignupForm() {
    this.signupForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}

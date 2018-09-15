import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';

import { AccountApi, ClientApi } from '../../../../sdk';


export interface Credentials {
  // Customize received credentials here
  accountName: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  token: string;
}

export interface SignupContext {
  accountName: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  remember?: boolean;
};

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
};

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  constructor(private accountApi: AccountApi,
    private clientApi: ClientApi) {
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<any> {

    //    https://github.com/mean-expert-official/loopback-sdk-builder/wiki/5.-Usage-Examples
    return this.clientApi.login(context, 'user', context.remember);
  }

  /**
   * Signup new user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  signup(context: SignupContext): Observable<any> {

    //    https://github.com/mean-expert-official/loopback-sdk-builder/wiki/5.-Usage-Examples
    return this.accountApi.signup(context);
    // return this.userApi.create(context);
    //return this.userApi.login(context, 'user', context.remember);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    return this.clientApi.logout();
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    const authenticated = this.clientApi.isAuthenticated();
    return authenticated;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this.clientApi.getCachedCurrent();
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//import { shareReplay } from 'rxjs/operators';

import { RegisteredUserApi } from '../../../../sdk';

//const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  //private cache$: Observable<Array<string>>;

  constructor(private registeredUserApi: RegisteredUserApi) { }

  getRoles(): Observable<any> {
    return this.requestRoles();
    /*
    console.log("get roles")
    if (!this.cache$) {
      this.cache$ = this.requestRoles().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
    */
  }

  private requestRoles(): Observable<any> {
    console.log("http request for roles");
    return this.registeredUserApi.getAuthenticatedUserRoles();
  }

}

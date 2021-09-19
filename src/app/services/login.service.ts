import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { AuthUser } from './../Interfaces/AuthUser';
import { AuthUserLogged } from './../Interfaces/AuthUserLogged';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly url = environment.services.endPointDevelopment;

  constructor(private http: HttpClient) { }

  LogIn(authUser: AuthUser): Observable<AuthUserLogged> {
    return this.http.post<AuthUserLogged>(`${this.url}AuthUser/Login`, authUser)
  }

  IsUserLogged(): boolean {
    return !!sessionStorage.getItem('userLogged');
  }
}

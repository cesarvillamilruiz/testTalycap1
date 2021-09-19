import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { User } from './../Interfaces/User';
import { AuthUserLogged } from './../Interfaces/AuthUserLogged';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.services.endPointDevelopment;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}AuthUser/Get_All_Users`);
  }

  deleteUsers(id): Observable<any> {
    return this.http.delete<any>(`${this.url}AuthUser/Delete_User/${id}`);
  }

  addUsers(id): Observable<any> {
    return this.http.post<any>(`${this.url}AuthUser/Add_New_User`, id);
  }

  updateUsers(id): Observable<any> {
    return this.http.delete<any>(`${this.url}AuthUser/Delete_User/${id}`);
  }
}

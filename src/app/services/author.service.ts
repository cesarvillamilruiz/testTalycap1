import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { AuthorDTO } from './../Interfaces/AuthorDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private readonly url = environment.services.endPointDevelopment;

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<AuthorDTO[]> {
    return this.http.get<AuthorDTO[]>(`${this.url}Author/Get_All_Authors`);
  }

  deleteUsers(id): Observable<any> {
    return this.http.delete<any>(`${this.url}Author/Delete_Author/${id}`);
  }

  addAuthor(author: AuthorDTO): Observable<any> {
    return this.http.post<any>(`${this.url}Author/Add_New_Author`, author);
  }

  updateAuthor(author: AuthorDTO, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}Author/Update_Author/${id}`, author);
  }
}

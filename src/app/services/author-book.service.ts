import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { AuthorDTO } from './../Interfaces/AuthorDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthorBookService {

  private readonly url = environment.services.endPointDevelopment;

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<AuthorDTO[]> {
    return this.http.get<AuthorDTO[]>(`${this.url}Author/Get_All_Authors`);
  }

  getbooksFomAuthorId(id: number): Observable<AuthorDTO> {
    return this.http.get<AuthorDTO>(`${this.url}Author/Get_Author_With_Books/${id}`);
  }

}

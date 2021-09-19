import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { Book } from './../Interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly url = environment.services.endPointDevelopment;

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}Book/Get_All_Books`);
  }

  deleteBook(id): Observable<any> {
    return this.http.delete<any>(`${this.url}Book/Delete_Book/${id}`);
  }

  addBook(author: Book): Observable<any> {
    return this.http.post<any>(`${this.url}Book/Add_New_book`, author);
  }

  updateBook(author: Book, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}Book/Update_Book/${id}`, author);
  }
}

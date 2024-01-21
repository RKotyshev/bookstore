import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook, IBookResponse } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _booksUrl = 'api/books/';

  constructor(private _http: HttpClient) { }

  public getBooksResponse(): Observable<IBookResponse> {
    return this._http.get<IBookResponse>(this._booksUrl);
  }

  public getPaginationBooks(pageIndex: number, pageSize: number): Observable<IBook[]> {
    const url = `${this._booksUrl}/?page=${pageIndex + 1}&page_size=${pageSize}`;

    return this._http.get<IBookResponse>(url)
      .pipe(map((response: IBookResponse) => response.result));
  }
}

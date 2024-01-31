import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IBook, IBookResponse } from '../interfaces/book';


@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _booksUrl = 'api/books/';

  constructor(private _http: HttpClient) { }

  public getBooksData(): Observable<IBookResponse> {
    return this._http.get<IBookResponse>(this._booksUrl);
  }

  public getPaginatedBooks(pageIndex: number, pageSize: number): Observable<IBook[]> {
    const correctIndexOrder: number = pageIndex + 1;
    const options = { 
      params: new HttpParams().set('page', correctIndexOrder).set('page_size', pageSize),
    };

    return this._http.get<IBookResponse>(this._booksUrl, options)
      .pipe(map((response: IBookResponse) => response.result));
  }
}

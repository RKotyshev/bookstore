import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IBook, IBookResponse } from '../interfaces/book';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _booksUrl = 'api/books/';

  constructor(private _http: HttpClient) { }

  public getBooksData(): Observable<IBookResponse> {
    return this._http.get<IBookResponse>(this._booksUrl);
  }

  public getPaginatedBooks(pageIndex: number, pageSize: number): Observable<IBook[]> {
    const pageNumber: number = pageIndex + 1;
    const params = {
      page: pageNumber,
      page_size: pageSize,
    };

    return this._http.get<IBookResponse>(this._booksUrl, { params })
      .pipe(map((response: IBookResponse) => response.result));
  }
}

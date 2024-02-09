import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IBook } from '../interfaces/book';
import { IResponse } from '../interfaces/response';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _booksUrl = 'api/books/';

  constructor(private _http: HttpClient) { }

  public getBooksData(): Observable<IResponse<IBook>> {
    return this._http.get<IResponse<IBook>>(this._booksUrl);
  }

  public getPaginatedBooks(pageIndex: number, pageSize: number): Observable<IBook[]> {
    const pageNumber: number = pageIndex + 1;
    const params = {
      page: pageNumber,
      page_size: pageSize,
    };

    return this._http.get<IResponse<IBook>>(this._booksUrl, { params })
      .pipe(map((response: IResponse<IBook>) => response.result));
  }

  public getBook(id: string): Observable<IBook> {
    return this._http.get<IBook>(this._booksUrl + id);
  }
}

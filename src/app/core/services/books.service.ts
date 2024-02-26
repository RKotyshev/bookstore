import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, take } from 'rxjs';

import { IBook, INewBook } from '../interfaces/book';
import { IResponse } from '../interfaces/response';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _booksUrl = 'api/books';

  constructor(private _http: HttpClient) { }

  public getBooksData(): Observable<IResponse<IBook>> {
    return this._http.get<IResponse<IBook>>(`${this._booksUrl}/`);
  }

  public getPaginatedBooks(pageIndex: number, pageSize: number): Observable<IBook[]> {
    const pageNumber: number = pageIndex + 1;
    const params = {
      page: pageNumber,
      page_size: pageSize,
    };

    return this._http.get<IResponse<IBook>>(`${this._booksUrl}/`, { params })
      .pipe(map((response: IResponse<IBook>) => response.result));
  }

  public getBook(id: string): Observable<IBook> {
    return this._http.get<IBook>(`${this._booksUrl}/${id}/`);
  }

  public postBook(book: INewBook): Observable<IBook> {
    return this._http.post<IBook>(`${this._booksUrl}/`, book).pipe(
      catchError((error) => {
        console.log(error.error);
        throw error;
      }),
      take(1),
    );
  }
}

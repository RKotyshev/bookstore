import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IBook, IRequestBook } from '../interfaces/book';
import { IResponse } from '../interfaces/response';
import { SortDirection } from '../../utils/constants/sorting';


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

  public postBook(book: IBook): Observable<IBook> {
    return this._http.post<IBook>(`${this._booksUrl}/`, book);
  }

  public getFilteredBooks(inputValues: IRequestBook): Observable<IResponse<IBook>> {
    const values = {
      ...inputValues,
    };

    if (values.filterType) {
      const direction = values.direction === SortDirection.Ascending ? '' : '-';
      const ordering = direction + values.filterType;
  
      values.ordering = ordering;
  
      delete values.filterType;
      delete values.direction;
    }

    const processedValues = Object.fromEntries(
      Object.entries(values).filter(([, value]: [string, string | number | null]) => {
        return value !== null && value !== '';
      }),
    );

    const params: HttpParams = new HttpParams({
      fromObject: processedValues as { [s: string]: string | number } },
    );

    return this._http.get<IResponse<IBook>>(`${this._booksUrl}/`, { params });
  }
}

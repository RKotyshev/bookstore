import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IBook, IBookAllParams, IBookFilterParams, IFilterBookForm, IFilterBookValues } from '../interfaces/book';
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

  public postBook(book: IBook): Observable<IBook> {
    return this._http.post<IBook>(`${this._booksUrl}/`, book);
  }

  public getBooksList(inputParams: IFilterBookValues): Observable<IBook[]> {
    const params = {
      ...inputParams,
    };
    const processedParams = Object.fromEntries(
      Object.entries(params).filter(([, value]: [string, string | number | null]) => {
        return value !== null && value !== '';
      }),
    );

    console.log(processedParams);


    const httpParams: HttpParams = new HttpParams({
      fromObject: processedParams as { [s: string]: string | number } },
    );

    // Object.keys(processedParams).forEach((key: string) => {
    //   // console.log(`${key}: ${JSON.stringify(processedParams[key])}`);
    //   httpParams = httpParams.append(key, JSON.stringify(processedParams[key]));
    // });

    console.log(`Http params: ${httpParams}`);
    // console.log(processedParams);

    return this._http.get<IResponse<IBook>>(`${this._booksUrl}/`, { params: httpParams }).pipe(
      map((response: IResponse<IBook>) => response.result),
    );
  }
}

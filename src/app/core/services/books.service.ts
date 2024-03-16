import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IBook, IRequestBook } from '../interfaces/book';
import { IResponse } from '../interfaces/response';
import { SortDirection } from '../../utils/constants/sorting';
import { formatDate } from '../../pages/books/utils/format-date';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _booksUrl = 'api/books';

  constructor(private _http: HttpClient) { }

  public static convertRequest(inputReq: IRequestBook): IRequestBook {
    let outputReq = {
      ...inputReq,
    };
    
    const correctWritingDateGte = outputReq.writing_date_gte ? 
      formatDate(outputReq.writing_date_gte) : 
      null;
    const correctWritingDateLte = outputReq.writing_date_lte ? 
      formatDate(outputReq.writing_date_lte) : 
      null;
    const correctReleaseDateGte = outputReq.release_date_gte ? 
      formatDate(outputReq.release_date_gte) : 
      null;
    const correctReleaseDateLte = outputReq.release_date_lte ? 
      formatDate(outputReq.release_date_lte) : 
      null;
    const correctPage = outputReq.page! + 1;
    const direction = outputReq.direction === SortDirection.Ascending ? '' : '-';
    const ordering = direction + outputReq.filterType;

    outputReq.writing_date_gte = correctWritingDateGte;
    outputReq.writing_date_lte = correctWritingDateLte;
    outputReq.release_date_gte = correctReleaseDateGte;
    outputReq.release_date_lte = correctReleaseDateLte;
    outputReq.page = correctPage;
    outputReq.ordering = ordering;

    delete outputReq.filterType;
    delete outputReq.direction;

    outputReq = Object.fromEntries(
      Object.entries(outputReq).filter(([_, value]: [string, string | number | null]) => {
        return value !== null && value !== '' && value !== undefined;
      }),
    );

    return outputReq;
  }

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

  public getFilteredBooks(inputReq: IRequestBook): Observable<IResponse<IBook>> {
    const correctReq = BooksService.convertRequest(inputReq);

    const params: HttpParams = new HttpParams({
      fromObject: correctReq as { [s: string]: string | number } },
    );

    return this._http.get<IResponse<IBook>>(`${this._booksUrl}/`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook, IRequestBook } from '../interfaces/book';
import { IResponse } from '../interfaces/response';
import { SortDirection } from '../interfaces/sorting';
import { formatDate } from '../../pages/books/utils/format-date';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _booksUrl = 'api/books';

  constructor(private _http: HttpClient) { }

  public static convertRequest(inputReq: IRequestBook): IRequestBook {
    let outputReq: IRequestBook = {
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
    const correctPage = +outputReq.page! + 1;
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

  public getBooks(inputParams?: IRequestBook): Observable<IResponse<IBook>> {
    if (!inputParams) {
      return this._http.get<IResponse<IBook>>(`${this._booksUrl}/`);
    }

    const correctParams = BooksService.convertRequest(inputParams);

    const params: HttpParams = new HttpParams({
      fromObject: correctParams as { [s: string]: string | number } },
    );

    return this._http.get<IResponse<IBook>>(`${this._booksUrl}/`, { params });
  }

  public getCurrentBook(id: string): Observable<IBook> {
    return this._http.get<IBook>(`${this._booksUrl}/${id}/`);
  }

  public postBook(book: IBook): Observable<IBook> {
    const correctReleaseDate = formatDate(book.release_date);
    const correctWritingDate = formatDate(book.writing_date);

    const correctBook = {
      ...book,
      release_date: correctReleaseDate,
      writing_date: correctWritingDate,
    };

    return this._http.post<IBook>(`${this._booksUrl}/`, correctBook);
  }
}

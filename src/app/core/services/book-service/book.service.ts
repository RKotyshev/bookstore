import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _booksUrl = 'api/books/';

  constructor(private _http: HttpClient) { }

  public getBooks(): Observable<IBook[]> {
    return this._http.get<{[s: string]: unknown, result: IBook[]}>(this._booksUrl)
      .pipe(map((response: {[s: string]: unknown, result: IBook[]}) => response.result));
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBOOK } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _booksUrl = 'api/books/';

  constructor(private _http: HttpClient) { }

  public getBooks(): Observable<{[s: string]: unknown, result: IBOOK[]}> {
    return this._http.get<{[s: string]: unknown, result: IBOOK[]}>(this._booksUrl);
  }
}

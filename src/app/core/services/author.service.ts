import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IAuthor, IAuthorResponse } from '../interfaces/author';


@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private _authorsUrl = 'api/authors';

  constructor(private _httpClient: HttpClient) { }

  public getAuthorsData():Observable<IAuthorResponse> {
    return this._httpClient.get<IAuthorResponse>(this._authorsUrl);
  }

  public getPaginatedAuthors(pageIndex: number, pageSize: number):Observable<IAuthor[]> {
    const correctIndexOrder: number = pageIndex + 1;
    const options = { 
      params: new HttpParams().set('page', correctIndexOrder).set('page_size', pageSize),
    };

    return this._httpClient.get<IAuthorResponse>(this._authorsUrl, options)
      .pipe(map((response: IAuthorResponse) => response.result));
  }
  
}

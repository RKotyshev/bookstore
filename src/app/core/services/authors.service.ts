import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IAuthor, IAuthorResponse } from '../interfaces/author';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private _authorsUrl = 'api/authors';

  constructor(private _httpClient: HttpClient) { }

  public getAuthorsData():Observable<IAuthorResponse> {
    return this._httpClient.get<IAuthorResponse>(this._authorsUrl);
  }

  public getPaginatedAuthors(pageIndex: number, pageSize: number):Observable<IAuthor[]> {
    const pageNumber: number = pageIndex + 1;
    const params = {
      page: pageNumber,
      page_size: pageSize,
    };

    return this._httpClient.get<IAuthorResponse>(this._authorsUrl, { params })
      .pipe(map((response: IAuthorResponse) => response.result));
  }
  
}

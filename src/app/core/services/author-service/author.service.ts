import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IAuthor, IAuthorResponse } from './author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private _authorsUrl = 'api/authors';

  constructor(private _httpClient: HttpClient) { }

  public getAuthorsResponse():Observable<IAuthorResponse> {
    return this._httpClient.get<IAuthorResponse>(this._authorsUrl);
  }

  public getPaginationAuthors(pageIndex: number, pageSize: number):Observable<IAuthor[]> {
    const url = `${this._authorsUrl}/?page=${pageIndex + 1}&page_size=${pageSize}`;

    return this._httpClient.get<IAuthorResponse>(url)
      .pipe(map((response: IAuthorResponse) => response.result));
  }
  
}

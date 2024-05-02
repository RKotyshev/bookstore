import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAuthor, IRequestAuthors } from '../interfaces/author';
import { IResponse } from '../interfaces/response';
import { BOOKSTORE_API } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private _authorsUrl = `${BOOKSTORE_API}/authors`;

  constructor(private _httpClient: HttpClient) { }

  public getAuthors(inputParams?: IRequestAuthors): Observable<IResponse<IAuthor>> {
    if (!inputParams) {
      return this._httpClient.get<IResponse<IAuthor>>(`${this._authorsUrl}/`);
    }
    
    const pageNumber: number = inputParams.page + 1;
    const params = {
      ...inputParams,
      page: pageNumber,
    };

    return this._httpClient.get<IResponse<IAuthor>>(`${this._authorsUrl}/`, { params });
  }

  public getCurrentAuthor(id: number): Observable<IAuthor> {
    return this._httpClient.get<IAuthor>(`${this._authorsUrl}/${id}/`);
  }

  public getSuggestedAuthors(term: string | null): Observable<IAuthor[]> {
    const params = {
      search: term ?? '',
    };

    return this._httpClient.get<IAuthor[]>(`${this._authorsUrl}/suggestion/`, { params });
  }
}

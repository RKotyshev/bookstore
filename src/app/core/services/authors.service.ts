import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { IAuthor } from '../interfaces/author';
import { IResponse } from '../interfaces/response';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private _authorsUrl = 'api/authors/';

  constructor(private _httpClient: HttpClient) { }

  public getAuthorsData(): Observable<IResponse<IAuthor>> {
    return this._httpClient.get<IResponse<IAuthor>>(this._authorsUrl);
  }

  public getPaginatedAuthors(pageIndex: number, pageSize: number): Observable<IAuthor[]> {
    const pageNumber: number = pageIndex + 1;
    const params = {
      page: pageNumber,
      page_size: pageSize,
    };

    return this._httpClient.get<IResponse<IAuthor>>(this._authorsUrl, { params })
      .pipe(map((response: IResponse<IAuthor>) => response.result));
  }

  public getAuthor(id: number): Observable<IAuthor> {
    return this._httpClient.get<IAuthor>(this._authorsUrl + id);
  }

  // public getAuthor(indexes: number[]): Observable<IAuthor>[] {
  //   const genresReq: Observable<IAuthor>[] = [];
  //   for (const id of indexes) {
  //     genresReq.push(this._httpClient.get<IAuthor>(this._authorsUrl + id));
  //   }

  //   return genresReq;
  // }
}

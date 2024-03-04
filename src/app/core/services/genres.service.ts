import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { IGenre } from '../interfaces/genre';
import { IResponse } from '../interfaces/response';


@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private _genresUrl = '/api/genres';

  constructor(private _httpClient: HttpClient) { }

  public getGenre(id: number): Observable<IGenre> {
    return this._httpClient.get<IGenre>(`${this._genresUrl}/${id}/`);
  }

  public getPaginatedGenres(pageIndex: number, pageSize: number): Observable<IGenre[]> {
    const pageNumber = pageIndex + 1;
    const params = {
      page: pageNumber,
      page_size: pageSize,
    };

    return this._httpClient.get<IResponse<IGenre>>(`${this._genresUrl}/`, { params }).pipe(
      map((response: IResponse<IGenre>) => response.result),
    );
  }

}

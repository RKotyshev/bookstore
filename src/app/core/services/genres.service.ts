import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IGenre } from '../interfaces/genre';


@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private _genresUrl = '/api/genres/';

  constructor(private _httpClient: HttpClient) { }

  public getGenre(id: number): Observable<IGenre> {
    return this._httpClient.get<IGenre>(this._genresUrl + id);
  }

  // public getGenre(indexes: number[]): Observable<IGenre>[] {
  //   const genresReq: Observable<IGenre>[] = [];
  //   for (const id of indexes) {
  //     genresReq.push(this._httpClient.get<IGenre>(this._genresUrl + id));
  //   }

  //   return genresReq;
  // }
}

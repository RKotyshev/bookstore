import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IGenre } from '../interfaces/genre';


@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private _genresUrl = '/api/genres';

  constructor(private _httpClient: HttpClient) { }

  public getGenre(id: number): Observable<IGenre> {
    return this._httpClient.get<IGenre>(`${this._genresUrl}/${id}/`);
  }

}

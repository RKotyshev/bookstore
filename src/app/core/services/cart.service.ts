import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ICartResponse } from '../interfaces/response';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartUrl = 'api/cart';

  constructor(
    private _http: HttpClient,
  ) { }

  public getCart(): Observable<ICartResponse> {
    return this._http.get<ICartResponse>(`${this._cartUrl}/`);
  }
}

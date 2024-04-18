import { Injectable } from '@angular/core';

import { Observable,
  // delay,
  // of,
} from 'rxjs';

// import { ICartItem } from '../interfaces/cart';
import { ICartResponse } from '../interfaces/response';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartUrl = 'api/cart';

  constructor(
    private _http: HttpClient,
  ) { }

  // public getCart(): Observable<ICartResponse> {
  //   const cartItemsCount = 5;
  //   const mockCartItems: ICartItem[] = [];
    
  //   for (let i = 0; i < cartItemsCount; i++) {
  //     const cartItemNumber = i + 1;
  //     const mockItem: ICartItem = {
  //       bookId: Math.trunc(Math.random() * 10),
  //       amount: Math.trunc(Math.random() * 100),
  //       city:	'Moscow',
  //       address: 'Sadovoya str., house 20',
  //       zipcode: 'abcdef123qweZkanq',
  //       id: cartItemNumber,
  //       state: 'pending',
  //       userId: Math.trunc(Math.random() * 10),
  //       warrantyDays: Math.trunc(Math.random() * 100),
  //       ordersId: '12345',
  //       ordersTime: String(new Date()),
  //       totalOrdersPrice: Math.trunc(Math.random() * 100),
  //       priceDiscounted: Math.trunc(Math.random() * 100),
  //       newPrice: Math.trunc(Math.random() * 100),
  //     };

  //     mockCartItems.push(mockItem);
  //   }

  //   const mockCartResponse: ICartResponse = {
  //     total: cartItemsCount,
  //     personsDiscountedPrice: Math.trunc(Math.random() * 100),
  //     products: mockCartItems,
  //   };
    
  //   return of(mockCartResponse).pipe(
  //     delay(300),
  //   );
  // }

  public getCart(): Observable<ICartResponse> {
    return this._http.get<ICartResponse>(`${this._cartUrl}/`);
  }
}

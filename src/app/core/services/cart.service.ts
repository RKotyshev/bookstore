import { Injectable } from '@angular/core';

import { Observable, interval, map, take } from 'rxjs';

import { ICartItem } from '../interfaces/cart';
import { ICartResponse } from '../interfaces/response';


@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor() { }

  public getCart(): Observable<ICartResponse> {
    return interval(300).pipe(
      take(1),
      map(() => {
        const cartItemsCount = 5;
        const mockCartItems: ICartItem[] = [];
        for (let i = 0; i < cartItemsCount; i++) {
          const cartItemNumber = i + 1;
          const mockItem: ICartItem = {
            book_id: Math.trunc(Math.random() * 10),
            amount: Math.trunc(Math.random() * 100),
            city:	'Moscow',
            address: 'Sadovoya str., house 20',
            zipcode: 'abcdef123qweZkanq',
            id: cartItemNumber,
            state: 'pending',
            user_id: Math.trunc(Math.random() * 10),
            warranty_days: Math.trunc(Math.random() * 100),
            orders_id: '12345',
            orders_time: String(new Date()),
            total_orders_price: Math.trunc(Math.random() * 100),
            price_discounted: Math.trunc(Math.random() * 100),
            new_price: Math.trunc(Math.random() * 100),
          };

          mockCartItems.push(mockItem);
        }

        const mockCartResponse: ICartResponse = {
          total: cartItemsCount,
          persons_discounted_price: Math.trunc(Math.random() * 100),
          products: mockCartItems,
        };

        return mockCartResponse;
      }),
    );
  }
}

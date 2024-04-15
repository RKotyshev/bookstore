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
            bookId: Math.trunc(Math.random() * 10),
            amount: Math.trunc(Math.random() * 100),
            city:	'Moscow',
            address: 'Sadovoya str., house 20',
            zipcode: 'abcdef123qweZkanq',
            id: cartItemNumber,
            state: 'pending',
            userId: Math.trunc(Math.random() * 10),
            warrantyDays: Math.trunc(Math.random() * 100),
            ordersId: '12345',
            ordersTime: String(new Date()),
            totalOrdersPrice: Math.trunc(Math.random() * 100),
            priceDiscounted: Math.trunc(Math.random() * 100),
            newPrice: Math.trunc(Math.random() * 100),
          };

          mockCartItems.push(mockItem);
        }

        const mockCartResponse: ICartResponse = {
          total: cartItemsCount,
          personsDiscountedPrice: Math.trunc(Math.random() * 100),
          products: mockCartItems,
        };

        return mockCartResponse;
      }),
    );
  }
}

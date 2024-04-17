import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ICartResponse } from '../../core/interfaces/response';
import { CartService } from '../../core/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  public cartResponse$!: Observable<ICartResponse>;

  constructor(
    private _cartService: CartService,
  ) { }

  public ngOnInit(): void {
    this.cartResponse$ = this._cartService.getCart();
  }
}

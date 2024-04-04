import { Component, Input } from '@angular/core';

import { IBook } from '../../../core/interfaces/book';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  @Input()
  public cartList: IBook[] = [];
}

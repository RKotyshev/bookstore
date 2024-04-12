import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ICartItem } from '../../../core/interfaces/cart';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  @Input()
  public cartItemsList: ICartItem[] = [];
}

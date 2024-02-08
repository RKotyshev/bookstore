import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';


@NgModule({
  declarations: [
    CartComponent,
    CartListComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    CartComponent,
  ],
})
export class CartModule { }

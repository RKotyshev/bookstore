import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import { MatListModule } from '@angular/material/list';
import { CartListComponent } from './cart-list/cart-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CartPageComponent,
    CartListComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    CartPageComponent,
  ],
})
export class CartPageModule { }

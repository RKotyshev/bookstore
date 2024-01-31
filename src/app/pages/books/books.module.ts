import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BooksComponent } from './books.component';
import { BooksListComponent } from './books-list/books-list.component';


@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  exports: [BooksComponent],
})
export class BooksPageModule { }

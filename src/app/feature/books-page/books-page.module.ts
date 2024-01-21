import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageComponent } from './books-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BooksListComponent } from './books-list/books-list.component';


@NgModule({
  declarations: [
    BooksPageComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  exports: [BooksPageComponent],
})
export class BooksPageModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksMainComponent } from './books-main/books-main.component';


const routes: Routes = [
  { path: '',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BooksMainComponent,
      },
      {
        path: 'new',
        component: BookCreateComponent,
      },
      {
        path: ':id',
        component: BookDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }

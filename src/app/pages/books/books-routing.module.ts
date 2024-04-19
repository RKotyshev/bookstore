import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { canDeactivateGuard } from '../../core/guards/can-deactivate.guard';


const routes: Routes = [
  {
    path: 'new',
    component: BookCreateComponent,
    canDeactivate: [canDeactivateGuard],
  },
  {
    path: ':id',
    component: BookDetailComponent,
  },
  {
    path: '',
    component: BooksComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }

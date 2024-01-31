import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './pages/main/main.component';
import { BooksComponent } from './pages/books/books.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CartComponent } from './pages/cart/cart.component';


const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

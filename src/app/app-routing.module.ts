import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './feature/main-page/main-page.component';
import { BooksPageComponent } from './feature/books-page/books-page.component';
import { AuthorsPageComponent } from './feature/authors-page/authors-page.component';
import { AuthPageComponent } from './feature/auth-page/auth-page.component';
import { CartPageComponent } from './feature/cart-page/cart-page.component';

const routes: Routes = [
  { path: 'books', component: BooksPageComponent },
  { path: 'authors', component: AuthorsPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

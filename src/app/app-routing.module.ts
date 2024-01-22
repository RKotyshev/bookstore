import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MainPageComponent } from './feature/main-page/main-page.component';
import { BooksPageComponent } from './feature/books-page/books-page.component';
import { AuthorsPageComponent } from './feature/authors-page/authors-page.component';
import { AuthPageComponent } from './feature/auth-page/auth-page.component';
import { CartPageComponent } from './feature/cart-page/cart-page.component';

const routes: Routes = [
  // { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/cart', pathMatch: 'full' },
  { path: 'books', component: BooksPageComponent },
  { path: 'auth', component: AuthPageComponent, pathMatch: 'full' },
  { path: 'authors', component: AuthorsPageComponent, pathMatch: 'full' },
  { path: 'cart', component: CartPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

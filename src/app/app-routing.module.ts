import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './feature/main-page/main-page.component';
import { BooksPageComponent } from './feature/books-page/books-page.component';
import { AuthorsPageComponent } from './feature/authors-page/authors-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'books', component: BooksPageComponent },
  { path: 'authors', component: AuthorsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

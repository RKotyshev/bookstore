import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { authorizationGuard } from './core/guards/authorization.guard';


const routes: Routes = [
  { path: 'books',
    loadChildren: () => import('./pages/books/books.module')
      .then((m: typeof import('./pages/books/books.module')) => m.BooksModule),
    canMatch: [authorizationGuard],
  },
  { path: 'authors',
    loadChildren: () => import('./pages/authors/authors.module')
      .then((m: typeof import('./pages/authors/authors.module')) => m.AuthorsModule),
    canMatch: [authorizationGuard],
  },
  { path: 'authorization', 
    loadChildren: () => import('./pages/authorization/authorization.module')
      .then((m: typeof import('./pages/authorization/authorization.module')) => m.AuthorizationModule),
  },
  { path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module')
      .then((m: typeof import('./pages/cart/cart.module')) => m.CartModule),
  },
  { path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

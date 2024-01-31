import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { MainPageModule } from './pages/main/main.module';
import { BooksPageModule } from './pages/books/books.module';
import { AuthPageModule } from './pages/auth/auth.module';
import { CartPageModule } from './pages/cart/cart.module';
import { AuthorsPageModule } from './pages/authors/authors.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PAGE_SIZE_OPTIONS } from './core/tokens/paginator.token';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MainPageModule,
    MatDividerModule,
    BooksPageModule,
    AuthorsPageModule,
    AuthPageModule,
    CartPageModule,
  ],
  providers: [
    { provide: PAGE_SIZE_OPTIONS, useValue: [5, 10, 20] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

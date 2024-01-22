import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MainPageModule } from './feature/main-page/main-page.module';
import { FooterToolbarComponent } from './footer-toolbar/footer-toolbar.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { BooksPageModule } from './feature/books-page/books-page.module';
import { AuthorsPageModule } from './feature/authors-page/authors-page.module';
import { AuthPageModule } from './feature/auth-page/auth-page.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterToolbarComponent,
    HeaderToolbarComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

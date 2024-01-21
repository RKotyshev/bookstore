import { Component, OnInit } from '@angular/core';
import { BookService } from './core/services/book-service/book.service';
import { IBook, IBookResponse } from './core/services/book-service/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  public title = 'bookstore-initial';
  private _books!: IBook[];

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this._getBooks();
  }

  private _getBooks(): void {
    this._bookService.getBooksResponse()
      .subscribe((response: IBookResponse) => {
        this._books = response.result;
      });
  }
}

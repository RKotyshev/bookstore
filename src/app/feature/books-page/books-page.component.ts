import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book-service/book.service';
import { IBook } from '../../core/services/book-service/book';
import { Subject, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent implements OnInit {
  public currentBooksList: IBook[] = [];
  public pageStartValue = 0;
  public pageEndValue = 5;
  private _destroyed = new Subject<void>;

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this._getBooks();
  }

  public getPaginatorData(event: PageEvent): void {
    this.pageStartValue = event.pageIndex * event.pageSize;
    this.pageEndValue = this.pageStartValue + event.pageSize;
  }

  private _getBooks() {
    this._bookService.getBooks()
      .pipe(takeUntil(this._destroyed))
      .subscribe((books: IBook[]) => this.currentBooksList = books);
  }


}

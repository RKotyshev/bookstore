import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book-service/book.service';
import { IBook, IBookResponse } from '../../core/services/book-service/book';
import { Subject, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent implements OnInit {
  public currentBooksList: IBook[] = [];
  public pageIndexStart = 0;
  public pageSizeStart = 5;
  public totalBooks!: number;
  private _destroyed = new Subject<void>;

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this._getBooks(this.pageIndexStart, this.pageSizeStart);
    this._getBooksCount();
  }

  public getPaginatorData(event: PageEvent): void {
    this._getBooks(event.pageIndex, event.pageSize);
  }

  private _getBooks(pageIndex: number, pageSize: number): void {
    this._bookService.getPaginationBooks(pageIndex, pageSize)
      .pipe(takeUntil(this._destroyed))
      .subscribe((books: IBook[]) => this.currentBooksList = books);
  }

  private _getBooksCount(): void {
    this._bookService.getBooksResponse()
      .subscribe((response: IBookResponse) => this.totalBooks = response.total_items);
  }
}

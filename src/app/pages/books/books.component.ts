import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Subject, takeUntil } from 'rxjs';

import { BookService } from '../../core/services/book.service';
import { PAGE_SIZE_OPTIONS } from '../../core/tokens/paginator.token';
import { IBook, IBookResponse } from '../../core/interfaces/book';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy {
  public currentBooksList: IBook[] = [];
  public pageIndexStart = 0;
  public pageSizeStart = 5;
  public totalBooks!: number;
  public pageSize = inject(PAGE_SIZE_OPTIONS);
  private _destroyed = new Subject<void>;

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this._getBooks(this.pageIndexStart, this.pageSizeStart);
    this._getBooksCount();
  }

  public getPaginatorData(event: PageEvent): void {
    this._getBooks(event.pageIndex, event.pageSize);
  }

  public ngOnDestroy():void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _getBooks(pageIndex: number, pageSize: number): void {
    this._bookService.getPaginatedBooks(pageIndex, pageSize)
      .pipe(takeUntil(this._destroyed))
      .subscribe((books: IBook[]) => this.currentBooksList = books);
  }

  private _getBooksCount(): void {
    this._bookService.getBooksData()
      .pipe(takeUntil(this._destroyed))
      .subscribe((response: IBookResponse) => this.totalBooks = response.total_items);
  }
}

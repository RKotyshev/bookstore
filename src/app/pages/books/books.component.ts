import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Subject, takeUntil } from 'rxjs';

import { BooksService } from '../../core/services/books.service';
import { IBook } from '../../core/interfaces/book';
import { IResponse } from '../../core/interfaces/response';
import { PageSizeOptions } from '../../utils/constants/paginator';


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
  public pageSize = PageSizeOptions;
  private _destroyed = new Subject<void>;

  constructor(private _bookService: BooksService) { }

  public ngOnInit(): void {
    this._getBooks(this.pageIndexStart, this.pageSizeStart);
    this._getBooksCount();
  }
 
  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public getPaginatorData(event: PageEvent): void {
    this._getBooks(event.pageIndex, event.pageSize);
  }

  private _getBooks(pageIndex: number, pageSize: number): void {
    this._bookService.getPaginatedBooks(pageIndex, pageSize)
      .pipe(takeUntil(this._destroyed))
      .subscribe((books: IBook[]) => this.currentBooksList = books);
  }

  private _getBooksCount(): void {
    this._bookService.getBooksData()
      .pipe(takeUntil(this._destroyed))
      .subscribe((response: IResponse<IBook>) => this.totalBooks = response.total_items);
  }
}

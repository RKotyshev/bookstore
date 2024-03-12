import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Observable, Subject, map } from 'rxjs';

import { BooksService } from '../../core/services/books.service';
import { IBook, IRequestBook } from '../../core/interfaces/book';
import { IResponse } from '../../core/interfaces/response';
import { PageSizeOptions } from '../../utils/constants/paginator';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy {
  // public currentBooksList: IBook[] = [];
  // public pageIndexStart = 0;
  // public pageSizeStart = 5;

  public pageIndexCurrent = 1;
  public pageSizeCurrent = 5;

  // public totalBooks!: number;
  public pageSize = PageSizeOptions;
  public totalBooks$!: Observable<number>;
  public currentBooksList$!: Observable<IBook[]>;
  public filterInput!: IRequestBook;
  private _destroyed = new Subject<void>;

  constructor(private _bookService: BooksService) { }

  public ngOnInit(): void {
    // this._getBooks(this.pageIndexStart, this.pageSizeStart);
    // this._getBooksCount();
    this._getBooksCurrent();
    this.totalBooks$ = this._bookService.getBooksData().pipe(
      map((response: IResponse<IBook>) => response.total_items),
      // tap(console.log),
    );
  }
 
  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public getPaginatorData(event: PageEvent): void {
    // this._getBooks(event.pageIndex, event.pageSize);
    // console.log('test');
    this.pageIndexCurrent = event.pageIndex + 1;
    this.pageSizeCurrent = event.pageSize;
    this._getBooksCurrent();
  }

  // private _getBooks(pageIndex: number, pageSize: number): void {
  //   this._bookService.getPaginatedBooks(pageIndex, pageSize)
  //     .pipe(takeUntil(this._destroyed))
  //     .subscribe((books: IBook[]) => this.currentBooksList = books);
  // }

  public onInput(value: IRequestBook): void {
    console.log(`Value from books component: ${JSON.stringify(value)}`);
    this.filterInput = value;
    this._getBooksCurrent();
  }

  private _getBooksCurrent(): void {
    const requestValue = {
      ...this.filterInput,
      page: this.pageIndexCurrent,
      page_size: this.pageSizeCurrent,
    };

    console.log(`Request value: ${JSON.stringify(requestValue)}`);

    this.currentBooksList$ = this._bookService.getBooksList(requestValue);
  }

  // private _getBooksCount(): void {
  //   this._bookService.getBooksData()
  //     .pipe(takeUntil(this._destroyed))
  //     .subscribe((response: IResponse<IBook>) => this.totalBooks = response.total_items);
  // }


}

import { Component, OnDestroy, OnInit } from '@angular/core';

import {  PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, Observable, Subject, combineLatest, map, switchMap } from 'rxjs';

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
  // public pageIndexCurrent = 1;
  // public pageSizeCurrent = 5;
  // public pageIndexStart = 1;
  // public pageSizeStart = 5;
  public pageSizes = PageSizeOptions;
  // public totalBooks$!: Observable<number>;
  public totalBooks!: number;
  // public currentBooksList$!: Observable<IBook[]>;
  public currentBooksList2$!: Observable<IBook[]>;
  // public filterInput!: IRequestBook;
  private _paginatorInitial = {
    page: 1,
    page_size: 5,
  };
  private _paginatorSubject = new BehaviorSubject<IRequestBook>(this._paginatorInitial);
  private _filterSubject = new BehaviorSubject<IRequestBook>({});
  // private _requestSubject = new Subject<void>();
  private _destroyed = new Subject<void>();

  constructor(private _bookService: BooksService) { }

  public ngOnInit(): void {
    // this._getBooks();
    // this.totalBooks$ = this._bookService.getBooksData().pipe(
    //   map((response: IResponse<IBook>) => response.total_items),
    // );

    // this.currentBooksList2$ = this._requestSubject.pipe(
    //   switchMap(() => )
    // );

    this.currentBooksList2$ = combineLatest(this._paginatorSubject, this._filterSubject).pipe(
      switchMap(([paginatorValue, filterValue]: [IRequestBook, IRequestBook]) => {
        const requestValue = {
          ...paginatorValue,
          ...filterValue,
        };

        return this._bookService.getBooksList(requestValue);
      }),
      map((response: IResponse<IBook>) => {
        this.totalBooks = response.total_items;

        return response.result;
      }),
    );
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public paginatorUpdate(event: PageEvent): void {
    // this.pageIndexCurrent = event.pageIndex + 1;
    // this.pageSizeCurrent = event.pageSize;
    // this._getBooks();

    // this._requestSubject.next();

    const pageNumber = event.pageIndex + 1;
    const pageSize = event.pageSize;
    const completedValue = {
      page: pageNumber,
      page_size: pageSize,
    };

    this._paginatorSubject.next(completedValue);
  }

  public filterUpdate(value: IRequestBook): void {
    // console.log(`Value from books component: ${JSON.stringify(value)}`);
    // this.filterInput = value;
    // this._getBooks();

    // this._requestSubject.next();
    this._paginatorSubject.next(this._paginatorInitial);
    this._filterSubject.next(value);
  }

  // private _getBooks(): void {
  //   const requestValue = {
  //     ...this.filterInput,
  //     page: this.pageIndexCurrent,
  //     page_size: this.pageSizeCurrent,
  //   };

  //   console.log(`Request value: ${JSON.stringify(requestValue)}`);

  //   this.currentBooksList$ = this._bookService.getBooksList(requestValue);
  // }


}

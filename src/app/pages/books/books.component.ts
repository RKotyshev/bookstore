import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {  MatPaginator, PageEvent } from '@angular/material/paginator';

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
  @ViewChild('paginator') public paginator!: MatPaginator;
  public pageSizes = PageSizeOptions;
  public totalBooks!: number;
  public currentBooksList$!: Observable<IBook[]>;
  private _paginatorInitState = {
    page: 1,
    page_size: 5,
  };
  private _paginatorSubject = new BehaviorSubject<IRequestBook>(this._paginatorInitState);
  private _filterSubject = new BehaviorSubject<IRequestBook>({});
  private _destroyed = new Subject<void>();

  constructor(private _bookService: BooksService) { }

  public ngOnInit(): void {
    this.currentBooksList$ = combineLatest(this._paginatorSubject, this._filterSubject).pipe(
      switchMap(([paginatorValue, filterValue]: [IRequestBook, IRequestBook]) => {
        const requestValue = {
          ...paginatorValue,
          ...filterValue,
        };

        return this._bookService.getFilteredBooks(requestValue);
      }),
      map((response: IResponse<IBook>) => {
        this.totalBooks = response.total_items;

        return response.result;
      }),
    );
  }

  public ngOnDestroy(): void {
    this._paginatorSubject.complete();
    this._filterSubject.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }

  public paginatorUpdate(event: PageEvent): void {
    const pageNumber = event.pageIndex + 1;
    const pageSize = event.pageSize;
    const completedValue = {
      page: pageNumber,
      page_size: pageSize,
    };

    this._paginatorSubject.next(completedValue);
  }

  public filterUpdate(value: IRequestBook): void {
    this.paginator.firstPage();
    this._filterSubject.next(value);
  }
}

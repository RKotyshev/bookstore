import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {  MatPaginator, PageEvent } from '@angular/material/paginator';

import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

import { BooksService } from '../../core/services/books.service';
import { IBook, IRequestBook } from '../../core/interfaces/book';
import { IResponse } from '../../core/interfaces/response';
import { PageSizeOptions } from '../../utils/constants/paginator';
import { BooksFilterComponent } from './books-filter/books-filter.component';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('paginator') public paginator!: MatPaginator;
  @ViewChild('filter') public filter!: BooksFilterComponent;
  public pageSizes = PageSizeOptions;
  public totalBooks!: number;
  public currentBooksList$!: Observable<IBook[]>;
  private _requestState: IRequestBook = {
    page: 0,
    page_size: 5,
  };
  private _requestSubject = new Subject<IRequestBook>();
  private _destroyed = new Subject<void>();

  constructor(private _bookService: BooksService) { }

  public ngOnInit(): void {
    this.currentBooksList$ = this._requestSubject.pipe(
      distinctUntilChanged((prev: IRequestBook, curr: IRequestBook) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
      debounceTime(300),
      switchMap((request: IRequestBook) => {
        return this._bookService.getFilteredBooks(request);
      }),
      map((response: IResponse<IBook>) => {
        this.totalBooks = response.total_items;

        return response.result;
      }),
    );
  }

  public ngAfterViewInit(): void {
    this.filter.onSubmit();
  }

  public ngOnDestroy(): void {
    this._requestSubject.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }

  public paginatorUpdate(event: PageEvent): void {
    this._requestState.page = event.pageIndex;
    this._requestState.page_size = event.pageSize;
    const request = {
      ...this._requestState,
    };

    this._requestSubject.next(request);
  }

  public filterUpdate(value: IRequestBook): void {
    this.paginator.firstPage();

    Object.assign(this._requestState, value);
    const request = {
      ...this._requestState,
    };

    this._requestSubject.next(request);
  }
}

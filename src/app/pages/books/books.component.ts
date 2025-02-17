import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {  MatPaginator, PageEvent } from '@angular/material/paginator';

import { 
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
} from 'rxjs';

import { BooksService } from '../../core/services/books.service';
import { IBook, IRequestBook } from '../../core/interfaces/book';
import { IResponse } from '../../core/interfaces/response';
import { PageSizeOptions } from '../../utils/constants/paginator';
import { SortDirection } from '../../core/interfaces/sorting';
import { DEFAULT_FILTER_TYPE } from './constants/filter';
import isEqual from 'lodash.isequal';

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 5;


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnDestroy {
  @ViewChild('paginator')
  public paginator!: MatPaginator;

  public booksResponse$!: Observable<IResponse<IBook>>;
  public paramsState: IRequestBook = {
    filterType: DEFAULT_FILTER_TYPE,
    direction: SortDirection.Ascending,
    page: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  };
  public paginatorInitialPageSize = DEFAULT_PAGE_SIZE;
  public params$ = this._route.queryParams.pipe(
    filter((params: IRequestBook) => {
      return params.page !== undefined && params.page !== null &&
      params.pageSize !== undefined && params.pageSize !== null;
    }),
    startWith(this.paramsState),
    debounceTime(300),
    distinctUntilChanged((previous: IRequestBook, current: IRequestBook) => {
      return isEqual(previous, current);
    }),
  );
  public readonly pageSizes = PageSizeOptions;
  private _destroyed = new Subject<void>();

  constructor(
    private _bookService: BooksService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
    this.booksResponse$ = this.params$.pipe(
      switchMap((params: IRequestBook) => {
        return this._bookService.getBooks(params);
      }),
    );
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public paginatorUpdate(event: PageEvent): void {
    this.paramsState = {
      ...this.paramsState,
      page: event.pageIndex,
      pageSize: event.pageSize,
    };

    this._router.navigate(['/books'], {
      queryParams: this.paramsState,
      replaceUrl: true,
    });
  }

  public filterUpdate(value: IRequestBook): void {
    this.paramsState = {
      ...this.paramsState,
      ...value,
    };

    this._router.navigate(['/books'], {
      queryParams: this.paramsState,
      replaceUrl: true,
    });

    this.paginator.firstPage();
  }
}

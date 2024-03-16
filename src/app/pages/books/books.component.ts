import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {  MatPaginator, PageEvent } from '@angular/material/paginator';

import { 
  // BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  // skipWhile,
  // startWith,
  switchMap,
} from 'rxjs';

import { BooksService } from '../../core/services/books.service';
import { IBook, IRequestBook } from '../../core/interfaces/book';
import { IResponse } from '../../core/interfaces/response';
import { PageSizeOptions } from '../../utils/constants/paginator';
import { BooksFilterComponent } from './books-filter/books-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SortDirection } from '../../utils/constants/sorting';


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
  public currentBooksList1$!: Observable<IBook[]>;
  private _requestState: IRequestBook = {
    page: 0,
    page_size: 5,
  };
  private _requestSubject = new Subject<IRequestBook>();
  private _destroyed = new Subject<void>();

  private _params1: IRequestBook = {
    filterType: 'id',
    direction: SortDirection.Ascending,
    page: 0,
    page_size: 5,
  };
  // private _paramsSubject = new BehaviorSubject(this._initialParams1);
  

  constructor(
    private _bookService: BooksService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

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

    this.currentBooksList1$ = this._route.queryParams.pipe(
      skip(1),
      // startWith(this._params1),
      distinctUntilChanged((prev: IRequestBook, curr: IRequestBook) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
      switchMap((params: IRequestBook) => {
        return this._bookService.getFilteredBooks1(params);
      }),
      map((response: IResponse<IBook>) => {
        this.totalBooks = response.total_items;

        return response.result;
      }),
    );

    this._router.navigate(['/books'], {
      queryParams: this._params1,
      onSameUrlNavigation: undefined,
    });

  }

  public ngAfterViewInit(): void {
    // this.filter.onSubmit();
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

  public paginatorUpdate1(event: PageEvent): void {
    this._params1 = {
      ...this._params1,
      page: event.pageIndex,
      page_size: event.pageSize,
    };

    this._router.navigate(['/books'], {
      queryParams: this._params1,
      onSameUrlNavigation: undefined,
    });
  }

  public filterUpdate(value: IRequestBook): void {
    this.paginator.firstPage();

    Object.assign(this._requestState, value);
    const request = {
      ...this._requestState,
    };

    this._requestSubject.next(request);
  }

  public filterUpdate1(value: IRequestBook): void {
    this._params1 = {
      ...this._params1,
      ...value,
    };

    if (this._params1.page === 0) {
      this._router.navigate(['/books'], {
        queryParams: this._params1,
        onSameUrlNavigation: undefined,
      });
    } 

    this.paginator.firstPage();
  }
}

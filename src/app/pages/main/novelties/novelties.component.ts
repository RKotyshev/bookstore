import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { map, switchMap, Observable } from 'rxjs';

import { IBreakpointParams, layoutMatcher } from '../constants/layout';
import { BooksService } from '../../../core/services/books.service';
import { IBook, IRequestBook } from '../../../core/interfaces/book';
import { IResponse } from '../../../core/interfaces/response';
import { SortDirection } from '../../../core/interfaces/sorting';

const DEFAULT_FILTER_TYPE = 'id';


@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrl: './novelties.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltiesComponent implements OnInit {
  public books$!: Observable<IBook[]>;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._getBooks();
  }

  private _getBooks(): void {
    const observeOptions = layoutMatcher.map((breakpointParams: IBreakpointParams) => {
      return breakpointParams.params;
    });

    this.books$ = this._breakpointObserver.observe(observeOptions).pipe(
      switchMap((result: BreakpointState) => {
        const currentSize = Object.entries(result.breakpoints)
          .find(([_, isMatched]: [string, boolean]) => {
            return isMatched;
          })![0];
        
        const booksCount = layoutMatcher.find((breakpointParams: IBreakpointParams) => {
          return breakpointParams.params === currentSize;
        })?.itemsCount;
        
        const params: IRequestBook = {
          page: 0,
          pageSize: booksCount,
          direction: SortDirection.Ascending,
          filterType: DEFAULT_FILTER_TYPE,
        };

        return this._booksService.getBooks(params);
      }),
      map((response: IResponse<IBook>) => response.result),
    );
  }
}

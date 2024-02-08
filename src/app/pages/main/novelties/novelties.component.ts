import { Component, OnDestroy, OnInit } from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Subject, takeUntil, map } from 'rxjs';

import { AppBreakpoints, DisplayNameMap } from '../../../utils/constants/layout';
import { BooksService } from '../../../core/services/books.service';
import { IBook } from '../../../core/interfaces/book';
import { IResponse } from '../../../core/interfaces/response';


@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrl: './novelties.component.scss',
})
export class NoveltiesComponent implements OnInit, OnDestroy {
  public noveltiesList!: IBook[];
  public currentScreenSize: string = 'unknown';
  private _booksList!: IBook[];
  private _noveltiesCountMap = new Map([
    ['isMVertical', 4],
    ['isMHorizontal', 6],
    ['isTablet', 8],
    ['isDesktop', 10],
  ]);
  private _destroyed = new Subject<void>();

  constructor(
    public breakpointObserver: BreakpointObserver,
    public booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._getBooks();
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _getBooks(): void {
    const books$ = this.booksService.getBooksData()
      .pipe(map((response: IResponse<IBook>) => response.result));

    books$.pipe(
      takeUntil(this._destroyed),
    )
      .subscribe(
        (books: IBook[]) => {
          this._booksList = books;
          this.noveltiesList = this._booksList
            .slice(0, (this._noveltiesCountMap.get(this.currentScreenSize)));

          this.breakpointObserver.observe([
            AppBreakpoints.MVertical,
            AppBreakpoints.MHorizontal,
            AppBreakpoints.Tablet,
            AppBreakpoints.Desktop,
          ])
            .pipe(takeUntil(this._destroyed))
            .subscribe((result: BreakpointState) => {
              for (const query of Object.keys(result.breakpoints)) {
                if (result.breakpoints[query]) {
                  this.currentScreenSize = DisplayNameMap.get(query) ?? 'unknown';
                  this.noveltiesList = this._booksList
                    .slice(0, (this._noveltiesCountMap.get(this.currentScreenSize)));
                }
              }
            });
        },
      );
  }

}

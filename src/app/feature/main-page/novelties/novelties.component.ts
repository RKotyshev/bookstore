import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppBreakpoints, DisplayNameMap } from '../../../utils/constants/layout-constants';
import { Subject, takeUntil } from 'rxjs';
import { BookService } from '../../../core/services/book-service/book.service';
import { IBook } from '../../../core/services/book-service/book';

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
    public bookService: BookService,
  ) {}

  public ngOnInit(): void {
    this._getBooks();
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _getBooks() {
    const books$ = this.bookService.getBooks();

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

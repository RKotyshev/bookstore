import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppBreakpoints, DisplayNameMap } from '../../../utils/constants/layout-constants';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { BookService } from '../../../core/services/book-service/book.service';
import { IBook } from '../../../core/services/book-service/book';

@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrl: './novelties.component.scss',
})
export class NoveltiesComponent implements OnInit, OnDestroy {
  public noveltiesList!: IBook[];
  public booksList!: IBook[];
  public currentScreenSize: string = 'unknown';
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
    this.getBooks();
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public async getBooks() {
    const response = await firstValueFrom(this.bookService.getBooks());
    
    this.booksList = response.result;

    this.noveltiesList = this.booksList
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
          if(result.breakpoints[query]) {
            this.currentScreenSize = DisplayNameMap.get(query) ?? 'unknown';
            console.log(this.currentScreenSize);
            this.noveltiesList = this.booksList
              .slice(0, (this._noveltiesCountMap.get(this.currentScreenSize)));
          }
        }
      });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppBreakpoints, DisplayNameMap } from '../../../utils/constants/layout-constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrl: './novelties.component.scss',
})
export class NoveltiesComponent implements OnInit, OnDestroy {
  public noveltiesList!: string[];
  public currentScreenSize: string = 'unknown';
  private _noveltiesCountMap = new Map([
    ['isMVertical', 4],
    ['isMHorizontal', 6],
    ['isTablet', 8],
    ['isDesktop', 10],
  ]);
  private _destroyed = new Subject<void>();

  constructor(public breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
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
            this.noveltiesList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
              .slice(0, (this._noveltiesCountMap.get(this.currentScreenSize)));
          }
        }
      });
  }

  public ngOnInit(): void {
    this.noveltiesList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      .slice(0, (this._noveltiesCountMap.get(this.currentScreenSize)));
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

}

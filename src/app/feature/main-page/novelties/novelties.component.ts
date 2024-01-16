import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrl: './novelties.component.scss',
})
export class NoveltiesComponent implements OnInit {
  public noveltiesList!: string[];
  public currentScreenSize: string = 'unknown';
  public noveltiesCountMap = new Map([
    ['isMVertical', 1],
    ['isMHorizontal', 3],
    ['isTablet', 4],
    ['isDesktop', 5],
  ]);

  // public displayNameMap = new Map([
  //   [Breakpoints.XSmall, 'XSmall'],
  //   [Breakpoints.Small, 'Small'],
  //   [Breakpoints.Medium, 'Medium'],
  //   [Breakpoints.Large, 'Large'],
  //   [Breakpoints.XLarge, 'XLarge'],
  // ]);

  public displayNameMap = new Map([
    ['(max-width: 766.98px)', 'isMVertical'],
    ['(min-width: 767px) and (max-width: 991.98px)', 'isMHorizontal'],
    ['(min-width: 992px) and (max-width: 1199.98px)', 'isTablet'],
    ['(min-width: 1200px)', 'isDesktop'],
  ]);

  public customBreakpoints = {
    'MVertical': '(max-width: 766.98px)',
    'MHorizontal': '(min-width: 767px) and (max-width: 991.98px)',
    'Tablet': '(min-width: 992px) and (max-width: 1199.98px)',
    'Desktop': '(min-width: 1200px)',
  };

  constructor(public breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      // Breakpoints.XSmall,
      // Breakpoints.Small,
      // Breakpoints.Medium,
      // Breakpoints.Large,
      // Breakpoints.XLarge,
      this.customBreakpoints.MVertical,
      this.customBreakpoints.MHorizontal,
      this.customBreakpoints.Tablet,
      this.customBreakpoints.Desktop,
    ])
      .subscribe((result: BreakpointState) => {
        for (const query of Object.keys(result.breakpoints)) {
          if(result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'unknown';
            console.log(this.currentScreenSize);
            this.noveltiesList = ['1', '2', '3', '4', '5']
              .slice(0, (this.noveltiesCountMap.get(this.currentScreenSize)));
          }
        }
      });
  }

  public ngOnInit(): void {
    // if (this.breakpointObserver.isMatched(['(min-width: 200px)'])) {
    //   console.log('isMatched');
    // }

    this.noveltiesList = ['1', '2', '3', '4', '5']
      .slice(0, (this.noveltiesCountMap.get(this.currentScreenSize)));
  }

}

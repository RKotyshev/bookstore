import { 
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ViewChild } from '@angular/core';

import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewChecked {
  public title = 'bookstore-initial';
  public isSidenavOpen: boolean = false;
  @ViewChild(HeaderComponent) public headerComponent!: HeaderComponent;

  constructor(
    private _changeDetection: ChangeDetectorRef,
  ) {}

  public ngAfterViewChecked(): void {
    this.isSidenavOpen = this.headerComponent.isMenuOpen;
    this._changeDetection.detectChanges();
  }

  public closeMenu() {
    this.headerComponent.isMenuOpen = false;
  }

}

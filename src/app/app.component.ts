import { Component, ViewChild } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { MobileMenuService } from './core/services/mobile-menu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'bookstore-initial';
  public isMenuOpen: boolean = false;
  @ViewChild(HeaderComponent) public headerComponent!: HeaderComponent;

  constructor(private _menuService: MobileMenuService) {}

  public closeMenu() {
    this._menuService.closeMenu();
    this.isMenuOpen = this._menuService.getMenuStatus();
    this.headerComponent.closeMenu();
  }

}

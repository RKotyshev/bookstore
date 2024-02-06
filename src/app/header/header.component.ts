import { Component, OnInit } from '@angular/core';

import { MobileMenuService } from '../core/services/mobile-menu.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public isMenuOpen!: boolean;

  constructor(private _menuService: MobileMenuService) { }

  public ngOnInit(): void {
    this.isMenuOpen = this.getMenuStatus();
  }

  public getMenuStatus(): boolean {
    return this._menuService.getMenuStatus();
  }

  public closeMenu(): void {
    this._menuService.closeMenu();
    this.isMenuOpen = this._menuService.getMenuStatus();
  }

  public openMenu(): void {
    this._menuService.openMenu();
    this.isMenuOpen = this.getMenuStatus();
  }
}

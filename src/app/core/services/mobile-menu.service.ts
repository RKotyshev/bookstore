import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  private _isMenuOpen: boolean = false;

  constructor() { }

  public openMenu(): void {
    this._isMenuOpen = true;
  }

  public closeMenu(): void {
    this._isMenuOpen = false;
  }

  public getMenuStatus(): boolean {
    return this._isMenuOpen;
  }
}

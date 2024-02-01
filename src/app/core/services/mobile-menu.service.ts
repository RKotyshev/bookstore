import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  public isMenuOpen: boolean = false;

  constructor() { }

  public openMenu() {
    this.isMenuOpen = true;
  }

  public closeMenu() {
    this.isMenuOpen = false;
  }

  public getMenuStatus() {
    return this.isMenuOpen;
  }
}

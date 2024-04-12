import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { MobileMenuService } from './core/services/mobile-menu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild(HeaderComponent)
  public headerComponent!: HeaderComponent;
  
  public title = 'bookstore-initial';
  public isMenuOpen: boolean = false;

  constructor(private _menuService: MobileMenuService) { }

  public closeMenu(): void {
    this._menuService.closeMenu();
    this.isMenuOpen = this._menuService.getMenuStatus();
    this.headerComponent.closeMenu();
  }
}

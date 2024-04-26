import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MobileMenuService } from './core/services/mobile-menu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'bookstore-initial';

  constructor(
    private _menuService: MobileMenuService,
  ) { }

  public closeMenu(): void {
    this._menuService.closeMenu();
  }
}

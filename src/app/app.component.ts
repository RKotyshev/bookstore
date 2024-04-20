import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MobileMenuService } from './core/services/mobile-menu.service';
import { AuthorizationService } from './core/services/authorization.service';


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
    private _authService: AuthorizationService,
  ) { }

  // public ngOnInit(): void {
  //   this._authService.isLoggedIn$.pipe(
  //     switchMap((isLogged: boolean) => {
  //       if (isLogged) {
  //         return EMPTY;
  //       }

  //       return this._authService.verifyToken('access');
  //     }),
  //   ).subscribe();
  // }

  public closeMenu(): void {
    this._menuService.closeMenu();
  }
}

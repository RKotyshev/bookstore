import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthorizationService } from '../../core/services/authorization.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  constructor(
    private _authService: AuthorizationService,
  ) {}

  public onLogout(): void {
    this._authService.logOut();
  }
}

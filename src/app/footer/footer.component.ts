import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../core/services/authorization.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(
    private _authService: AuthorizationService,
  ) {}

  public get isLoggedIn$(): Observable<boolean> {
    return this._authService.isLoggedIn$;
  }
}

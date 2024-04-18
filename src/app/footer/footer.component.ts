import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthorizationService } from '../core/services/authorization.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(
    public authService: AuthorizationService,
  ) {}
}

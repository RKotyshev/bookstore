import { 
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { MobileMenuService } from '../core/services/mobile-menu.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isMenuOpen!: boolean;
  private _destroyed = new Subject<void>();

  constructor(
    private _menuService: MobileMenuService,
    private _cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this._menuService.menuStatus$.pipe(
      takeUntil(this._destroyed),
    ).subscribe(
      (status: boolean) => {
        this.isMenuOpen = status;
        this._cdr.markForCheck();
      },
    );
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public closeMenu(): void {
    this._menuService.closeMenu();
  }

  public openMenu(): void {
    this._menuService.openMenu();
  }
}

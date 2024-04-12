import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  private _menuStatusChanged = new BehaviorSubject(false);

  public get menuStatus$(): Observable<boolean> {
    return this._menuStatusChanged.asObservable();
  }

  public openMenu(): void {
    this._menuStatusChanged.next(true);
  }

  public closeMenu(): void {
    this._menuStatusChanged.next(false);
  }
}

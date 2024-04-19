import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor() { }

  public confirm(message: string): Observable<boolean> {
    const confirmation = window.confirm(message);

    return of(confirmation);
  }
}

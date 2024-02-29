import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


export function handleError(error: HttpErrorResponse): Observable<never> {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(`Backend returned code: ${error.status}, body:`, error.error);
  }

  return throwError(() => new Error('Something bad happened; please try again later.'));
}

import { Observable, throwError } from 'rxjs';


export function handleError(): Observable<never> {
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

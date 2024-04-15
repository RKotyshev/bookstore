import { 
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';


@Injectable()
export class ParamsAdapterInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newOutputParams: { [x: string]: unknown } = {};

    for (const key of req.params.keys()) {
      newOutputParams[key] = req.params.get(key);
    }

    const transformedOutputParams = new HttpParams({
      fromObject: this.transformParamsOrBody(newOutputParams, 'toServer') as { 
        [s: string]: string | number,
      },
    });

    const newOutputBody: object | null = req.body ? structuredClone(req.body) : null;
    const transformedOutputBody: object | null = newOutputBody ? 
      this.transformParamsOrBody(newOutputBody, 'toServer') : null;

    const cloneReq = req.clone({
      params: transformedOutputParams,
      body: transformedOutputBody,
    });

    return next.handle(cloneReq).pipe(
      map((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          const newInputBody: object | null = event.body ? structuredClone(event.body) : null;

          const transformedInputBody: object | null = newInputBody ? 
            this.transformParamsOrBody(newInputBody, 'toClient') : null;

          const cloneEvent = event.clone({
            body: transformedInputBody,
          });

          return cloneEvent;
        }

        return event;
      }),
    );
  }

  public transformParamsOrBody(
    inputObj: object | unknown[],
    direction: 'toClient' | 'toServer',
  ): object {
    if (Array.isArray(inputObj)) {
      return inputObj.map((value: unknown) => {

        if (typeof value === 'object' && value !== null) {
          return this.transformParamsOrBody(value, direction);
        }

        return value;
      });
    }

    return Object.entries(inputObj).reduce(
      (resultObject: { [x: string]: unknown }, [key, value]: [string, unknown]) => {

        if (typeof value === 'object' && value !== null) {
          value = this.transformParamsOrBody(value, direction);
        }

        const transformedKey = this.transformKey(key, direction);
  
        resultObject[transformedKey] = value;
  
        return resultObject;
      }, {});
  }

  public transformKey(key: string, direction: 'toClient' | 'toServer'): string  {
    if (direction === 'toClient') {

      if (!key.includes('_')) {
        return key;
      }

      while (key.includes('_')) {
        const dashIndex = key.indexOf('_');
        const beforeDash = key.slice(0, dashIndex);
        const afterDash = key.slice(dashIndex + 1)[0].toUpperCase() + key.slice(dashIndex + 2);
        key = beforeDash + afterDash;
      }

      return key;
    }

    if (!(/[A-Z]/.test(key))) {
      return key;
    }

    while (/[A-Z]/.test(key)) {
      const match = key.match(/[A-Z]/);
      const lowerLetter = match![0].toLowerCase();
      key = `${key.slice(0, match?.index)}_${lowerLetter}${key.slice(match!.index! + 1)}`;
    }
    
    return key;
  }
}

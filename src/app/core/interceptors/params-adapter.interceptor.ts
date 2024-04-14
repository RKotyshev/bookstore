import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

interface IParamsObj {
  [x: string]: string | null
}

interface IBodyObj {
  [x: string]: string | number | object | null, 
}


@Injectable()
export class ParamsAdapterInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const transformedParams = req.params;
    // console.log(req.params);
    // console.log(req.body);

    const paramsObject: IParamsObj = {};

    for (const key of req.params.keys()) {
      paramsObject[key] = req.params.get(key);
    }

    const cloneBody = req.clone().body;

    // let transformedBody: unknown = {};

    if (cloneBody) {
      // transformedBody = this.transformToClientParams(cloneBody);
    }

    // const transformedParams = this.transformToClientParams(paramsObject);

    // console.log(paramsObject);

    // console.log(`Transformed params = ${JSON.stringify(transformedParams)}`);
    // console.log(`Transformed body = ${JSON.stringify(transformedBody)}`);

    return next.handle(req).pipe(
      map((event: HttpEvent<unknown>) => {
        console.log('Event from backend:');
        console.log(event);

        if (event instanceof HttpResponse) {
          console.log('event body:');
          console.log(event.body);

          const transformedServerBody = this.transformToClientParams(event.body);
          console.log('transformed event body:');
          console.log(transformedServerBody);
        }

        return event;
      }),
    );
  }

  public transformToClientParams(inputObj: unknown): unknown {
    if (Array.isArray(inputObj)) {
      return inputObj.map((value: unknown) => {
        if (typeof value === 'object') {
          return this.transformToClientParams(value);
        }

        return value;
      });
    }

    if (typeof inputObj === 'object' && inputObj !== null && inputObj !== undefined) {
      return Object.entries(inputObj).reduce(
        (resultObject: { [x: string]: unknown }, [key, value]: [string, unknown]) => {
          if (typeof value === 'object') {
            value = this.transformToClientParams(value);
          }
    
          if (!key.includes('_')) {
            resultObject[key] = value;
    
            return resultObject;
          }
    
          while (key.includes('_')) {
            const dashIndex = key.indexOf('_');
            const beforeDash = key.slice(0, dashIndex);
            const afterDash = key.slice(dashIndex + 1)[0].toUpperCase() + key.slice(dashIndex + 2);
            key = beforeDash + afterDash;
          }
    
          resultObject[key] = value;
    
          return resultObject;
        }, {});
    }
  }

  public transformToServerParams(inputObj: unknown): unknown {
    if (Array.isArray(inputObj)) {
      // console.log('test');

      return inputObj.map((value: unknown) => {
        if (typeof value === 'object') {
          console.log('value is object');

          return this.transformToServerParams(value);
        }
  
        return value;
      });
    }
    
    if (typeof inputObj === 'object' && inputObj !== null && inputObj !== undefined) {
      // console.log('test');

      return Object.entries(inputObj).reduce(
        (resultObject: { [x: string]: unknown }, [key, value]: [string, unknown]) => {
          if (typeof value === 'object') {
            value = this.transformToServerParams(value);
          }
      
          if (!(/[A-Z]/.test(key))) {
            resultObject[key] = value;
            console.log(`key = ${key}`);
      
            return resultObject;
          }
      
          while (/[A-Z]/.test(key)) {
            const match = key.match(/[A-Z]/);
            key = `${key.slice(0, match?.index)} _  ${match![0]
              .toLowerCase()} ${key.slice(match!.index! + 1)}`;
          }
      
          resultObject[key] = value;
          
          console.log('test');

          return resultObject;
        }, {});
    }

  }
}

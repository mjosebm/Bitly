import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN = '7286cc18f1c127660caa08be92511bd8f9d1ec3e';

    request = request.clone({ setHeaders: {Authorization: 'Bearer ' + TOKEN } })
    return next.handle(request);
  }
}

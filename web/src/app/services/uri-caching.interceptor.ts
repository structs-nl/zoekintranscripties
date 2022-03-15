import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UriCachingInterceptor implements HttpInterceptor {
  private cachedData = new Map<string, any>();

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET' || this.cachedData.has(request.url)) {
      return next.handle(request);
    }

    const cacheHit = this.cachedData.get(request.urlWithParams);

    return cacheHit ? of(cacheHit) : this.cacheResponse(request, next);
  }

  cacheResponse(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response) => {
        this.cachedData.set(request.urlWithParams, response);
      })
    );
  }
}

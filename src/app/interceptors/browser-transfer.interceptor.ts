import { isPlatformServer } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformServer(this.platformId)) {
      return next.handle(req);
    }

    if (req.method === 'GET') {
      console.log('req.url STATE_BROWSER: ', req.url);

      const key = makeStateKey(req.url);
      const storedResponse: any = this.transferState.get(key, null);

      console.log('storedResponse STATE_BROWSER: ', storedResponse);

      if (storedResponse) {
        const response = new HttpResponse({ body: storedResponse, status: 200 });
        return of(response);
      }
    }

    return next.handle(req);
  }
}

import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, TransferState, makeStateKey } from '@angular/core';
import { tap } from 'rxjs';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('req.url STATE_SERVER: ', req.url);

    return next.handle(req).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 202 || event.status === 304)
        ) {
          console.log('req.url STATE_SERVER: ', req.url);
          console.log('event.body: ', event.body);

          this.transferState.set(makeStateKey(req.url), event.body);
        }
      })
    );
  }
}

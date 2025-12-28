import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { AppState } from './app.state';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/operators';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private appStore: AppState 
    ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
        //setHeaders: { tokenCaptcha: this.appStore.tokenCaptcha }
      });
    return next.handle(authReq);
    const started = Date.now();
    let ok: string;
    
    //.pipe(takeUntil(this.cancelAllHttpService.pendingHTTPRequests.asObservable()),
    //   map((event: HttpEvent<any>) => {
       
    //     if (event instanceof HttpResponse) {
         
    //       if (event.status == 209)
    //         this.InterceptorService.onClose.emit()
    //     }
    //     return event;
    //   })
    // );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  private siteKey = environment.recaptcha.siteKey;

  execute(action: string): Observable<string> {
    return new Observable<string>((observer) => {

      if (!window.grecaptcha) {
        observer.error('reCAPTCHA not loaded');
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(this.siteKey, { action })
          .then((token: string) => {
            observer.next(token);
            observer.complete();
          })
          .catch((error: any) => {
            observer.error(error);
          });
      });

    });
  }
}

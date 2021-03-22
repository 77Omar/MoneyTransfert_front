import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from './auth.service';
import {from} from 'rxjs';
import {Storage} from '@ionic/storage';
import {switchMap} from 'rxjs/operators';
const tokenKey = 'token';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor{

  constructor( private injector: Injector, private storage: Storage, private authService: AuthService) { }

  // @ts-ignore
  intercept(req, next) {
    // const authService = this.injector.get(AuthService);
    return from(this.storage.get(tokenKey))
      .pipe(
        switchMap(token => {
          console.log(token);
          if (token){
                req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            }
          return next.handle(req);
        })
      );
  }

}

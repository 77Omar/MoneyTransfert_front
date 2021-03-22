/*import { Injectable } from '@angular/core';
import {CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  queryParams: any;
  constructor(private router: Router) {
  }

  canLoad()  {
    const isAuthenticated = !!(+localStorage.getItem('token'));
    if (isAuthenticated){
      return true;
    }else {
      const navigation = this.router.getCurrentNavigation();

      let url = '/';
      if (navigation){
        url = navigation.extractedUrl.toString();
      }

      // @ts-ignore
      this.router.navigateByUrl(['/login'], {queryParams: {returnto: url}});
      return false;
    }
  }
}
*/

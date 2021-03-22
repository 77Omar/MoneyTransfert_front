import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private router: Router, private storage: Storage) { }


  gettokenlogin(user){
    return this.http.post<any>('api/login', user);
  }
  // tslint:disable-next-line:typedef
  /*getToken() {
    return this.storage.get('token');
  }*/
  onLogout() {
    this.storage.remove('token');
    this.router.navigate(['/login']);
  }
}

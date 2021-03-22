import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transactions} from '../Models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor( private http: HttpClient) { }

  // List Solde
  getSoldeUser(route: string): any {
    return this.http.get(route);
  }

  // tslint:disable-next-line:typedef
   createDepot( body) {
    return this.http.post('api/admin/transaction/depot', body);
  }

  // tslint:disable-next-line:typedef
   retraitDepot( body) {
    return this.http.put('api/admin/transaction/retrait', body);
  }

  // List Solde
  getCommissionDepot(page: number): any {
    return this.http.get(`api/admin/transaction/commission/depot?page=${page}`);
  }

  getCommissionRetrait(page: number): any {
    return this.http.get(`api/admin/transaction/commission/retrait?page=${page}`);
  }


  getTransactionDepot(page: number): any {
    return this.http.get(`api/admin/transaction/userDepot?page=${page}`);
  }

  getTransactionRetrait(page: number): any {
    return this.http.get(`api/admin/transaction/userRetrait?page=${page}`);
  }
}

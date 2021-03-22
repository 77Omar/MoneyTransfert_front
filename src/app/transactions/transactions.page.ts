import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IonSelect} from '@ionic/angular';
import {RepositoryService} from '../services/repository.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  public Type = new BehaviorSubject('depot');
  transaction = [];
  totale: number;
  totalItems: number;
  nombrePage: number;
  page = 1;

  constructor( private http: HttpClient,  private repoService: RepositoryService)  { }

  ngOnInit() {
    this.requestTransaction();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.page++;
      this.requestTransaction();
      event.target.complete();
    }, 500);
  }

  requestTransaction(){
    this.Type.subscribe(res => {
      if (res === 'depot'){
        this.repoService.getTransactionDepot(this.page).subscribe((response: any) => {
          for (const t of response['hydra:member'] ){
            this.transaction.push(t);
          }

          this.totale = 0;
          if (this.nombrePage == null){
            this.totalItems = response['hydra:totalItems'];
            this.nombrePage = Math.ceil(this.totalItems / 4);
          }
          this.nombrePage--;
          console.log(this.nombrePage);
          for (const value of this.transaction){
            this.totale += value.montant;
          }
        });
      }
      else {
        this.repoService.getTransactionRetrait(this.page).subscribe((response: any) => {
          for (const t of response['hydra:member'] ){
            this.transaction.push(t);
          }

          this.totale = 0;
          if (this.nombrePage == null){
            this.totalItems = response['hydra:totalItems'];
            this.nombrePage = Math.ceil(this.totalItems / 4);
          }
          this.nombrePage--;
          console.log(this.nombrePage);
          for (const value of this.transaction){
            this.totale += value.montant;
          }
        });
      }
    });
  }

  selectAll(val: IonSelect) {
    this.Type.next(val.value);
  }
}

import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IonSelect} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {RepositoryService} from '../services/repository.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {

  public Type = new BehaviorSubject('depot');
  commission = [];
  totale: number;
  totalItems: number;
  nombrePage: number;
  page = 1;

  constructor( private http: HttpClient, private repoService: RepositoryService)  {
  }

  ngOnInit() {
    this.requestCommission();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.page++;
      this.requestCommission();
      event.target.complete();
    }, 500);
  }

  requestCommission(){
    this.Type.subscribe(res => {
      if (res === 'depot'){
        this.repoService.getCommissionDepot(this.page).subscribe((response: any) => {
            for (const c of response['hydra:member'] ){
              this.commission.push(c);
          }

            this.totale = 0;
            if (this.nombrePage == null){
            this.totalItems = response['hydra:totalItems'];
            this.nombrePage = Math.ceil((this.totalItems / 4));
          }
            this.nombrePage--;
            console.log(this.nombrePage);
            for (const value of this.commission){
            this.totale += value.frais_depot;
          }
        });
      }else {

        this.repoService.getCommissionRetrait(this.page).subscribe((response: any) => {
          for (const c of response['hydra:member'] ){
            this.commission.push(c);
          }

          this.totale = 0;
          if (this.nombrePage == null){
            this.totalItems = response['hydra:totalItems'];
            this.nombrePage = Math.ceil((this.totalItems / 4));
          }
          this.nombrePage--;
          console.log(this.nombrePage);
          for (const value of this.commission){
            this.totale += value.frais_retrait;
          }
        });
      }
    });
  }

  selectAll(val: IonSelect) {
    this.Type.next(val.value);
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {RepositoryService} from '../services/repository.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  @ViewChild('retraitForm') myForm: NgForm;
  retraitForm: FormGroup;
  public segment = 'list';
  public arr = new Array(7);
   retrait: any;
   retraitform: any;

  // tslint:disable-next-line:max-line-length
  constructor( private fb: FormBuilder, private http: HttpClient,  public alertCtrl: AlertController, private repositoryService: RepositoryService) {}

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  ngOnInit(): void {
    this.retraitForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern('[0-9]{3}\-[0-9]{3}\-[0-9]{3}$')]],
      cni: ['', [Validators.required, Validators.pattern('[0-9]{13}$')]]
    });

    this.retraitForm.get('code').valueChanges.subscribe((code: string) => {
      if (this.retraitForm.get('code').valid) {
       this.http.get(`api/transaction/${code}/retrait`).subscribe( (res: any) => {
           this.retrait = res;
           console.log(res);
       });
      }
    });
  }

  async showAlert() {
    console.log(this.retraitForm.get('cni').value);
    const alert = await this.alertCtrl.create({
      header: 'Confirmer',
      message: `RECEPTEUR : ${this.retrait.clientRetrait.nomComplet}
               TELEPHONE : ${this.retrait.clientRetrait.phone}<br>
               N° CNI : ${this.retraitForm.get('cni').value}<br>
               MONTANT RECU : ${this.retrait.montant}<br>
               EMETTEUR :  ${this.retrait.clientDepot.nomComplet}<br>
               TELEPHONE :  ${this.retrait.clientDepot.phone}` ,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

            console.log('Canceled');
          }
        },
        {
          text: 'Retrait',
          handler: () => {
            this.repositoryService.retraitDepot(this.retraitForm.value).subscribe( response => {
                this.retraitform = response;
                console.log(response);
              },
              error => {
                console.log(error);
              });
          }
        }
      ]
    });
    await alert.present();
  }
}

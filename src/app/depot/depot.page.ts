import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {RepositoryService} from '../services/repository.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {

  @ViewChild('depotForm') myForm: NgForm;
  depotForm: FormGroup;
  public segment = 'list';
   public arr = new Array(7);
   total: number;
   frais: number;
   createDepot: any;
   codeDepot: any;

  // tslint:disable-next-line:max-line-length
  constructor( private fb: FormBuilder, private http: HttpClient,  public alertCtrl: AlertController, private repositoryService: RepositoryService) {}

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  ngOnInit(): void {
    this.depotForm = this.fb.group({
        clientD: this.fb.group({
          nomComplet: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
          phone: ['', [Validators.required, Validators.pattern('7[7|6|8|0|5][0-9]{7}$')]],
          cni: ['', [Validators.required, Validators.pattern('[0-9]{13}$')]],
        }),

        clientR: this.fb.group({
          nomComplet: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
          phone: ['', [Validators.required, Validators.pattern('7[7|6|8|0|5][0-9]{7}$')]],
        }),
      montant: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5000000)]],
    });

// function Creation Montant depot
    this.depotForm.get('montant').valueChanges.subscribe((montant: number) => {
      if (Number(montant) && montant > 0 && montant <= 5000000)
      {
        this.total = montant;
        this.http.get(`api/user/${montant}/taxe`).subscribe( (res: any) => {
          this.frais = res.frais;
          this.total = + montant + (res.frais); } ); }
      else{ this.total = 0; this.frais = 0;
      } });
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmer',
      message: `EMETTEUR : ${this.depotForm.get('clientD').get('nomComplet').value }
               TELEPHONE : ${this.depotForm.get('clientD').get('phone').value}<br>
               N° CNI : ${this.depotForm.get('clientD').get('cni').value}<br>
               MONTANT A ENVOYER :  ${this.depotForm.get('montant').value}<br>
               RECEPTEUR :  ${this.depotForm.get('clientR').get('nomComplet').value }<br>
               MONTANT A RECEVOIR :  ${this.depotForm.get('montant').value} ` ,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

            console.log('Canceled');
          }
        },
        {
          text: 'Envoyer',
          handler: () => {
            this.repositoryService.createDepot( this.depotForm.value).subscribe( response => {
              this.createDepot = response;
              console.log(response);
              this.MessageAlert();
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

  async MessageAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Transfert Reussi',
      subHeader: 'Info',
      message: `Vous avez envoyé:  ${this.depotForm.get('montant').value}fcfa<br>
               à ${this.depotForm.get('clientD').get('nomComplet').value }<br> le ${this.createDepot.date_depot }<br><br>
               Code de transaction:  ${this.createDepot.code} ` ,
      buttons: ['OK']
    });

    await alert.present();
  }
}

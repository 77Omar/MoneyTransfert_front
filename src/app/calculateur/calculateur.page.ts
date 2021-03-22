import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.page.html',
  styleUrls: ['./calculateur.page.scss'],
})
export class CalculateurPage implements OnInit {

  calculatorForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.calculatorForm = this.formBuilder.group({
      type: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1), Validators.pattern('[0-9]+$')]]
    });
  }

  calculFrais() {
    // tslint:disable-next-line:max-line-length
    this.http.get(`api/admin/transaction/calculfrais/${this.calculatorForm.get('type').value}/${this.calculatorForm.get('montant').value}`).subscribe((response: any) => {
      let type = '';
      if (this.calculatorForm.get('type').value === 'depot'){
        type = 'depot';
      }else {
        type = 'retrait';
      }
      this.successPopup(response.frais, type);
    });
  }

  async successPopup(frais, type) {
    const alert = await this.alertCtrl.create({
      header: 'Calculateur',
      cssClass: 'my-custom-class',
      message: `Pour une transaction de ${this.calculatorForm.get('montant').value} Fcfa le frais de ${type}
      est égal à ${frais}`,
      buttons: [{
        text: 'Retour',
        handler: () => {
        }
      }, ]
    });

    await alert.present();
  }
}

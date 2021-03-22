import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {RepositoryService} from '../services/repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  montant: any;
 loginUrl = '';

  constructor(private auhService: AuthService, private router: Router,
              private repoService: RepositoryService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.repoService.getSoldeUser('api/admin/users/solde_Compte').subscribe(
       response => {
          this.montant = response;
       },
      error => console.log(error)
     );

    $(document).ready(() => {
      $('#show_Montant a').on('click', (e) => {
        e.preventDefault();
        if ($('#show_Montant ion-input').attr('type') === 'text'){
          $('#show_Montant ion-input').attr('type', 'hidden');
          $('#show_Montant ion-icon').attr('name', 'eye-off-outline');
        }
        else if ($('#show_Montant ion-input').attr('type') === 'hidden'){
          $('#show_Montant ion-input').attr('type', 'text');
          $('#show_Montant ion-icon').attr('name', 'eye-outline');
        }
      });
    });

    this.loginUrl = this.activatedRoute.snapshot.queryParamMap.get('returnto') || 'commission';
    console.log(this.loginUrl);
  }

  onLogout() {
    localStorage.setItem('token', '1');
    this.router.navigateByUrl(this.loginUrl);
    this.auhService.onLogout();
  }
}

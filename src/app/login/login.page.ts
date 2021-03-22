import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginForm') myForm: NgForm;
  loginForm: FormGroup;
  constructor(private authservice: AuthService,
              private router: Router,
              private storage: Storage) { }

  userData = {
    password: '',
    email: '',
  };

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );

    $(document).ready(() => {
      $('#pass a').on('click', (e) => {
        e.preventDefault();
        if ($('#pass ion-input').attr('type') === 'password'){
          $('#pass ion-input').attr('type', 'text');
          $('#pass ion-icon').attr('name', 'eye-outline');
        }
        else if ($('#pass ion-input').attr('type') === 'text'){
          $('#pass ion-input').attr('type', 'password');
          $('#pass ion-icon').attr('name', 'eye-off-outline');
        }
      });
    });
  }


  onSubmit() {
    this.authservice.gettokenlogin(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.storage.set('token', res.token);
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    );
  }
}

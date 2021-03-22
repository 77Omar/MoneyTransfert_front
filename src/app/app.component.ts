import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Transactions', url: '/transactions', icon: 'time' },
    { title: 'Commission', url: '/commission', icon: 'cash' },
    { title: 'Calculateur', url: '/calculateur', icon: 'calculator' },
    { title: ' Sign Out', url: '/folder/ Sign Out', icon: 'log-out' },
  ];
  constructor() {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsUsersPageRoutingModule } from './transactions-users-routing.module';

import { TransactionsUsersPage } from './transactions-users.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TransactionsUsersPageRoutingModule
    ],
  declarations: [TransactionsUsersPage]
})
export class TransactionsUsersPageModule {}

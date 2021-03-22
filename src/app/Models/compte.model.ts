// @ts-ignore
import {Deserializable} from './deserializable.interface';


export class Agence implements Deserializable{
  id?: number;
  numeroCompte: number;
  solde: number;
  // tslint:disable-next-line:variable-name
  date_creation: any;
  transactions: any;
  depots: any;
  agence: any;


  // tslint:disable-next-line:variable-name max-line-length
  constructor( numeroCompte: number, solde: number, date_creation: any, transactions: any, depots: any, agence: any, id?: number) {
    this.id = id;
    this.numeroCompte = numeroCompte;
    this.solde = solde;
    this.date_creation = date_creation;
    this.transactions = transactions;
    this.depots = depots;
    this.agence = agence;
  }

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}


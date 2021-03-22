// @ts-ignore
import {Deserializable} from './deserializable.interface';

export class Transactions implements Deserializable{
  id?: number;
  montant: number;
  date_depot: string;
  date_retrait: string;
  code: string;
  date_annulation: string;
  frais: number;
  frais_depot: number;
  frais_retrait: number;
  frais_etat: number;
  frais_systeme: number;
  compte: any;
  userDepot: any;
  userRetrait: any;
  clientDepot: any;
  clientRetrait: any;


  // tslint:disable-next-line:variable-name max-line-length
  constructor( montant: number, date_depot: string, date_retrait: string, code: string, date_annulation: string, frais: number, frais_depot: number,  frais_retrait: number, frais_etat: number , frais_systeme: number, compte: any, userDepot: any, userRetrait: any, clientDepot: any, clientRetrait: any, id?: number) {
    this.id = id;
    this.montant = montant;
    this.date_depot = date_depot;
    this.date_retrait = date_retrait;
    this.code = code;
    this.date_annulation = date_annulation;
    this.frais = frais;
    this.frais_depot = frais_depot;
    this.frais_retrait = frais_retrait;
    this.frais_etat = frais_etat;
    this.frais_systeme = frais_systeme;
    this.compte = compte;
    this.userDepot = userDepot;
    this.userRetrait = userRetrait;
    this.clientDepot = clientDepot;
    this.clientRetrait = clientRetrait;
  }

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}


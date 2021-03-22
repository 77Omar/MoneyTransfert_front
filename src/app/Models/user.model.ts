// @ts-ignore
import {Deserializable} from './deserializable.interface';

export class User implements Deserializable{
  id?: number;
  prenom: string;
  nom: string;
  email: string;
  password: string;
  phone: string;
  adresse: string;
  cni: string;
  profil: any;
  agence: any;
  transactions: any;
  depots: any;


  // tslint:disable-next-line:variable-name max-line-length
  constructor( prenom: string, nom: string, email: string, password: string, phone: string, adresse: string, cni: string,  profil: any, agence: any , transactions: any, depots: any, id?: number) {
    this.id = id;
    this.prenom = prenom;
    this.nom = nom;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.adresse = adresse;
    this.cni = cni;
    this.profil = profil;
    this.agence = agence;
    this.transactions = transactions;
    this.depots = depots;
  }

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

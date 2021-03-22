// @ts-ignore
import {Deserializable} from './deserializable.interface';


export class Agence implements Deserializable{
  id?: number;
  nomAgence: string;
  adresseAgence: string;
  latitude: string;
  Longitude: string;
  users: any;
  compte: any;


  // tslint:disable-next-line:variable-name max-line-length
  constructor( nomAgence: string, adresseAgence: string, latitude: string, Longitude: string, users: any, compte: any, id?: number) {
    this.id = id;
    this.nomAgence = nomAgence;
    this.adresseAgence = adresseAgence;
    this.latitude = latitude;
    this.Longitude = Longitude;
    this.users = users;
    this.compte = compte;
  }

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}


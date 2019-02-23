import {Podatnik} from './Podatnik';
export class Klient extends Podatnik{
   constructor (public LoginUzytkownika:string, public Nazwa:string, public Opis:string, nrKontaBankowego:string, adres:string, nip:string, nazwaFirmy:string){
        super(nrKontaBankowego, adres, nip, nazwaFirmy);
   }
}
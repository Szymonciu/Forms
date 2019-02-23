import {Podatnik} from './Podatnik';
import {Klient} from './Klient';
export class Uzytkownik extends Podatnik{
    Klienci:Array<Klient>;
   constructor (public Login:string, public Haslo:string,nrKontaBankowego:string,adres:string,nip:string,nazwaFirmy:string){
        super(nrKontaBankowego,adres,nip,nazwaFirmy);
        this.Klienci = new Array<Klient>();
   }
   dodajKlienta(klient:Klient){
       this.Klienci.push(klient);
   }
}
import {Faktura} from './Faktura';
import {Produkt} from './Produkt';
export class Podatnik{
    public Faktury:Array<Faktura>
    public Produkty:Array<Produkt>
    constructor(public NrKontaBankowego:string, public Adres:string, public Nip:string, public NazwaFirmy:string){
        this.Faktury = new Array<Faktura>();
        this.Produkty = new Array<Produkt>();
    }
    dodajFakture(faktura:Faktura){
        this.Faktury.push(faktura);
    }
    dodajProdukt(produkt:Produkt){
        this.Produkty.push(produkt);
    }
}
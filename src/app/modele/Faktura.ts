import {Klient} from './Klient';
import {Produkt} from './Produkt';
import {Uzytkownik} from './Uzytkownik';
export class Faktura{
    public Produkty:Array<Produkt>;
    public Klient:Klient;
    public Uzytkownik:Uzytkownik;
    public Nazwa:string;
    public Opis: string;
    public Kwota:number;
    public Zdefiniowana:boolean;
    public Historyczna:boolean;
    public Vat:number;

    constructor(public NumerFaktury:string, public LoginUzytkownika:string,public LoginKlienta:string, public DataWystawienia:Date,public ProduktyId:Array<Produkt>, public FormaPlatnosci:string,public DataPlatnosci:Date){}
}
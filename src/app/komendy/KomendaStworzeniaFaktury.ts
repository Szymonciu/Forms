
import {Produkt} from '../modele/Produkt';

export class KomendaStworzeniaFaktury{
    public LoginUzytkownika:string;
    public LoginKlienta:string;
    public Nazwa:string;
    public Opis:string;
    public Kwota:number;
    public DataWystawienia:Date;
    public FormaPlatnosci:string;
    public DataPlatnosci:Date;
    public Produkty:Array<Produkt>;
    public NumerFaktury:string;
    public Zdefinowana:boolean;
    public Vat:number;
    constructor(){
        this.Produkty = new Array<Produkt>()
    }
}
import { Client } from './client';
import { Product } from './product';
import { User } from './user';
export class Invoice {
    public Produkty: Array<Product>;
    public Klient: Client;
    public Uzytkownik: User;
    public Nazwa: string;
    public Opis: string;
    public Kwota: number;
    public Zdefiniowana: boolean;
    public Historyczna: boolean;
    public Vat: number;

    constructor(public NumerFaktury: string, public LoginUzytkownika: string, public LoginKlienta: string, public DataWystawienia: Date, public ProduktyId: Array<Product>, public FormaPlatnosci: string, public DataPlatnosci: Date) { }
}
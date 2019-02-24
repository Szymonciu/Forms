import { Invoice } from './invoice';
import { Product } from './product';
export class TaxPayer {
    public Faktury: Array<Invoice>
    public Produkty: Array<Product>
    constructor(public NrKontaBankowego: string, public Adres: string, public Nip: string, public NazwaFirmy: string) {
        this.Faktury = new Array<Invoice>();
        this.Produkty = new Array<Product>();
    }
    dodajFakture(faktura: Invoice) {
        this.Faktury.push(faktura);
    }
    dodajProdukt(produkt: Product) {
        this.Produkty.push(produkt);
    }
}
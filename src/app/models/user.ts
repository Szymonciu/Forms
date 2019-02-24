import { TaxPayer } from './tax.payer';
import { Client } from './client';
export class User extends TaxPayer {
    Klienci: Array<Client>;
    constructor(public Login: string, public Haslo: string, nrKontaBankowego: string, adres: string, nip: string, nazwaFirmy: string) {
        super(nrKontaBankowego, adres, nip, nazwaFirmy);
        this.Klienci = new Array<Client>();
    }
    dodajKlienta(klient: Client) {
        this.Klienci.push(klient);
    }
}
import { TaxPayer } from './tax.payer';
export class Client extends TaxPayer {
   constructor(public LoginUzytkownika: string, public Nazwa: string, public Opis: string, nrKontaBankowego: string, adres: string, nip: string, nazwaFirmy: string) {
      super(nrKontaBankowego, adres, nip, nazwaFirmy);
   }
}
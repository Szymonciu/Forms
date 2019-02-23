import { Injectable } from '@angular/core';
import { KomendaStworzeniaFaktury } from '../komendy/KomendaStworzeniaFaktury';
import { RepozytoriumFaktur } from '../repozytoria/RepozytoriumFaktur';
import { RepozutoriumKlientów } from '../repozytoria/RepozutoriumKlientów';
import { RepozytoriumProduktów } from '../repozytoria/RepozytoriumProduktów';
import { RepozytoriumUzytkowników } from '../repozytoria/RepozytoriumUzytkowników';
import { Uzytkownik } from '../modele/Uzytkownik';
import { Faktura } from '../modele/Faktura';
import { Produkt } from '../modele/Produkt';

@Injectable()
export class PrzetwarzanieFaktur {
    constructor(public repoFaktur: RepozytoriumFaktur, public repoUzytkownika: RepozytoriumUzytkowników, public repoKlientów: RepozutoriumKlientów, public repoProduktów: RepozytoriumProduktów) { }

    Faktura: Faktura;
    Zdefiniowana;
    Procent = 0.23;
    ProcentCaly = 1.23;
    FakturaPodsumowanie = {
        Vat: null,
        Brutto: null,
        Netto: null
    };

    Pobierz(login: string): Array<Faktura> {
        var faktury = this.repoFaktur.PobierzDlaUzytkownika(login);
        for (let i = 0; i < faktury.length; i++) {
            this.UzupełnijFakture(faktury[i]);
        }
        return faktury;
    }

    PobierzZdefiniowane(login: string): Array<Faktura> {
        var faktury = this.repoFaktur.PobierzZdefiniowane(login);
        for (let i = 0; i < faktury.length; i++) {
            this.UzupełnijFakture(faktury[i]);
        }
        return faktury;
    }

    Dodaj(komenda: KomendaStworzeniaFaktury): boolean {
        var result = this.repoFaktur.Dodaj(komenda);
        if (result) {
            return true;
        }
        return false;
    }

    PobierzPoNumerze(nrFaktury: string, loginUzytkownika: string) {
        var faktura = this.repoFaktur.PobierzPoNumerze(nrFaktury, loginUzytkownika);
        this.UzupełnijFakture(faktura);
        this.Faktura = faktura;
        return faktura;
    }

    UzupełnijFakture(faktura: Faktura) {
        var uzytkownik = this.repoUzytkownika.Pobierz(faktura.LoginUzytkownika);
        var klient = this.repoKlientów.Pobierz(faktura.LoginKlienta);
        var produkty = new Array<Produkt>();
        for (let i = 0; i < faktura.ProduktyId.length; i++) {

            let produkt = this.repoProduktów.Pobierz(faktura.ProduktyId[i].Nazwa)
            if (produkt != undefined && produkt != null) {
                produkt.Ilosc = faktura.ProduktyId[i].Ilosc;
                produkty.push(produkt);
            }
        }
        faktura.Uzytkownik = uzytkownik;
        faktura.Klient = klient;
        faktura.Produkty = produkty;
    }

    WygenerujNumerFaktury(loginUzytkownika: string): string {
        var nrFaktury = ""
        var now = new Date();
        var i = 1;
        do {
            nrFaktury = i.toString() + "/" + now.getMonth() + "/" + now.getFullYear();

            var is = this.repoFaktur.PobierzPoNumerze(nrFaktury, loginUzytkownika);

            if (is != null)
                i++;
            else return nrFaktury;
        } while (true);
    }

    WyliczDlaFaktury() {
        this.Procent = this.Faktura.Vat / 100;
        this.ProcentCaly = this.Procent + 1;

        this.FakturaPodsumowanie.Vat = 0;
        this.FakturaPodsumowanie.Netto = 0;
        this.FakturaPodsumowanie.Brutto = 0;
        for (let i = 0; i < this.Faktura.Produkty.length; i++) {
            this.FakturaPodsumowanie.Vat = this.FakturaPodsumowanie.Vat + (this.Faktura.Produkty[i].CenaNetto * this.Faktura.Produkty[i].Ilosc * this.Procent);
            this.FakturaPodsumowanie.Netto = this.FakturaPodsumowanie.Netto + (this.Faktura.Produkty[i].CenaNetto * this.Faktura.Produkty[i].Ilosc);
            this.FakturaPodsumowanie.Brutto = this.FakturaPodsumowanie.Brutto + (this.Faktura.Produkty[i].CenaNetto * this.Faktura.Produkty[i].Ilosc * this.ProcentCaly);
        }
        this.FakturaPodsumowanie.Vat = this.precisionRound(this.FakturaPodsumowanie.Vat, 2)
        this.FakturaPodsumowanie.Netto = this.precisionRound(this.FakturaPodsumowanie.Netto, 2)
        this.FakturaPodsumowanie.Brutto = this.precisionRound(this.FakturaPodsumowanie.Brutto, 2)

    }
    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    Usun(faktura: Faktura) {
        this.repoFaktur.Usun(faktura);
    }
    UsunPoNazwie(faktura: Faktura) {
        this.repoFaktur.UsunPoNazwie(faktura);
    }
}
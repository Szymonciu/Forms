import { LocalDB } from '../pomoce/LocalDB';
import { Injectable } from '@angular/core';
import { Klient } from '../modele/Klient';
import { KomendaStworzeniaKlienta } from '../komendy/KomendaStworzeniaKlienta'
import { KomendaEdycjiKlienta } from '../komendy/KomendaEdycjiKlienta'

@Injectable()
export class RepozutoriumKlientów {
    prfix = "Klienci";
    constructor(public tmpRepo: LocalDB) {
        if (tmpRepo.Get(this.prfix) == null) {
            var Klienci = new Array<Klient>();
            this.tmpRepo.Add(this.prfix, Klienci);
        }
    }

    Dodaj(komenda: KomendaStworzeniaKlienta): boolean {
        var klient = this.Pobierz(komenda.Nazwa);
        if (klient !== null)
            return false;

        klient = new Klient(komenda.LoginUzytkownika, komenda.Opis, komenda.Nazwa, komenda.NrKontaBankowego, komenda.Adres, komenda.Nip, komenda.NazwaFirmy);

        var klienci = this.tmpRepo.Get(this.prfix);
        klienci.push(klient);

        this.tmpRepo.Add(this.prfix, klienci);
        return true;
    }

    Pobierz(nazwa: string): Klient {
        var klienci = this.tmpRepo.Get(this.prfix);
        if (klienci.length > 0) {
            for (let i = 0; i < klienci.length; i++) {
                if (klienci[i].Nazwa == nazwa) {
                    return klienci[i];
                }
            }
        }
        return null;
    }

    PobierzDlaUzytkownika(login: string): Array<Klient> {
        var klienciDlaUzytkownika = new Array<Klient>();
        var klienci = this.tmpRepo.Get(this.prfix);
        if (klienci.length > 0) {
            for (let i = 0; i < klienci.length; i++) {
                if (klienci[i].LoginUzytkownika == login) {
                    klienciDlaUzytkownika.push(klienci[i]);
                }
            }
        }
        return klienciDlaUzytkownika
    }

    PobierzWszystkie(): Array<Klient> {
        var klienci = this.tmpRepo.Get(this.prfix);
        return klienci
    }

    UsunPoNazwie(klient:Klient){
        var indexOf;
        var klienci = this.PobierzWszystkie();
        for(let i = 0; i< klienci.length;i++){
            if(klienci[i].Nazwa == klient.Nazwa && klienci[i].LoginUzytkownika == klient.LoginUzytkownika)
                indexOf = i;
        }
        klienci.splice(indexOf,1);
        this.tmpRepo.Add(this.prfix, klienci);
        return true;
    }

    Edytuj(komenda: KomendaEdycjiKlienta){
        var klienci = this.PobierzWszystkie()
        var klient:Klient;

        for(let i = 0; i< klienci.length;i++){
            if(klienci[i].Nazwa == komenda.Nazwa && klienci[i].LoginUzytkownika == komenda.LoginUzytkownika)
                klient = klienci[i];
                
        }

        klient.Adres = komenda.Adres;
        klient.NrKontaBankowego = komenda.NrKontaBankowego;
        klient.Nip = komenda.Nip;
        klient.NazwaFirmy = komenda.NazwaFirmy;

        this.tmpRepo.Add(this.prfix, klienci);
        return true;

    }

}
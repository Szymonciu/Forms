import { Injectable } from '@angular/core';
import {KomendaAutoryzacji} from '../komendy/KomendaAutoryzacji';
import {KomendaRejestracji} from '../komendy/KomendaRejestracji';
import {LocalDB} from '../pomoce/LocalDB';
import {RepozytoriumUzytkowników} from '../repozytoria/RepozytoriumUzytkowników';
import {Uzytkownik} from '../modele/Uzytkownik';
// import { KomendaDodaniaKlientaDlaUzytkownika } from '../komendy/KomendaDodaniaKlientaDlaU\u017Cytkownika';
import { Klient } from '../modele/Klient';
import { KomendaEdycjiUzytkownika } from '../komendy/KomendaEdycjiUzytkownika';
import { KomendaZmianyHasla } from '../komendy/KomendaZmianyHasla';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LogowanieUzytkownika{
    użytkownik:Uzytkownik;
    constructor(public matSnar:MatSnackBar, public repoUzytkowników:RepozytoriumUzytkowników, public local: LocalDB){}
    Zaloguj(komenda:KomendaAutoryzacji){
        var użytkownik = this.repoUzytkowników.Pobierz(komenda.Login);
        if(użytkownik == null || użytkownik == undefined)
            return false;
        if(użytkownik.Haslo == komenda.Haslo){
            this.local.Authorize(użytkownik.Login);
            this.użytkownik = użytkownik;
        }else{
            return false;   
        }
    }
    Wyloguj(){
        this.użytkownik = null;
        this.local.Logout();
    }

    Zarejestruj(komenda:KomendaRejestracji){
        if(this.repoUzytkowników.Dodaj(komenda))
            return true;
        else return false;      
    }

    JestZalogowany(){
        return this.użytkownik != null && this.użytkownik != undefined;
    }

    ZalogowanyUzytkownik():Uzytkownik{
        return this.użytkownik;
    }

    Edytuj(komenda:KomendaEdycjiUzytkownika){
        if(this.repoUzytkowników.Edytuj(komenda))
            return true;
        return false;
    }

    ZmienHaslo(komenda:KomendaZmianyHasla){
        if(this.repoUzytkowników.ZmienHaslo(komenda))
        return true;
    return false;
    }

    // DodajKlientaDlaUzytkownika(komenda:KomendaDodaniaKlientaDlaUzytkownika){
    //     var użytkownik = this.repoUzytkowników.Pobierz(komenda.LoginUzytkownika)

    //     użytkownik.dodajKlienta(new Klient(komenda.Nazwa,komenda.Opis,komenda.NrKontaBankowego,komenda.Adres,komenda.Nip,komenda.NazwaFirmy));

    //     this.repoUzytkowników.Zapisz(użytkownik);
    //     this.użytkownik = użytkownik;
    // }
}
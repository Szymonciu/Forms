import {LocalDB} from '../pomoce/LocalDB';
import { Injectable } from '@angular/core';
import {Uzytkownik} from '../modele/Uzytkownik';
import {KomendaRejestracji} from '../komendy/KomendaRejestracji'
import { KomendaEdycjiUzytkownika } from '../komendy/KomendaEdycjiUzytkownika';
import { KomendaZmianyHasla } from '../komendy/KomendaZmianyHasla';

@Injectable()
export class RepozytoriumUzytkowników{
    constructor(public tmpRepo:LocalDB){
        var Klienci = new Array<Uzytkownik>();
        this.tmpRepo.Add("Użytkownicy",Klienci);
    }

    Dodaj(komenda:KomendaRejestracji){
        var uz = this.Pobierz(komenda.Login);
        if(uz != null)
            return false;
        var użytkownik = new Uzytkownik(komenda.Login,komenda.Haslo,komenda.NrKontaBankowego,komenda.Adres,komenda.Nip,komenda.NazwaFirmy);
        console.log(użytkownik);
        this.tmpRepo.Add(użytkownik.Login,użytkownik)
        return true;
    }

    Pobierz(login:string):Uzytkownik{
       var użytkownik = this.tmpRepo.Get(login);
       return użytkownik
    }

    Zapisz(użytkownik:Uzytkownik){
        this.tmpRepo.Add(użytkownik.Login,użytkownik)
    }

    Edytuj(komenda:KomendaEdycjiUzytkownika){
        var uzytkownik = this.Pobierz(komenda.Login);
        if(uzytkownik == null)
            return false;
        uzytkownik.Adres = komenda.Adres;
        uzytkownik.NazwaFirmy = komenda.NazwaFirmy;
        uzytkownik.NrKontaBankowego = komenda.NrKontaBankowego;
        uzytkownik.Nip = komenda.Nip;
        this.tmpRepo.Add(komenda.Login, uzytkownik);
        return true;
    }

    ZmienHaslo(komenda:KomendaZmianyHasla){
        var uzytkownik = this.Pobierz(komenda.Login);
        if(uzytkownik == null)
            return false;
        uzytkownik.Haslo = komenda.NoweHaslo;
        this.tmpRepo.Add(komenda.Login, uzytkownik);
        return true;
    }

 

}
import { Injectable } from '@angular/core';
import { KomendaStworzeniaKlienta } from '../komendy/KomendaStworzeniaKlienta';
import { RepozutoriumKlientów } from '../repozytoria/RepozutoriumKlientów';
import { Uzytkownik } from '../modele/Uzytkownik';
import { Klient } from '../modele/Klient';
import { KomendaEdycjiKlienta } from '../komendy/KomendaEdycjiKlienta';

@Injectable()
export class PrzetwarzanieKlienta {
    constructor(public repoKlientów: RepozutoriumKlientów) { }


    Pobierz(login:string):Array<Klient>{
        return this.repoKlientów.PobierzDlaUzytkownika(login);
    }

    Dodaj(komenda: KomendaStworzeniaKlienta): boolean {
        var result = this.repoKlientów.Dodaj(komenda);
        if (result) {
            return true;
        }
        return false;
    }

    UsunPoNazwie(klient:Klient){
        var result = this.repoKlientów.UsunPoNazwie(klient);
        if (result) {
            return true;
        }
        return false;
    }

    Edytuj(komenda:KomendaEdycjiKlienta){
        var result = this.repoKlientów.Edytuj(komenda);
        if (result) {
            return true;
        }
        return false;
    }
}
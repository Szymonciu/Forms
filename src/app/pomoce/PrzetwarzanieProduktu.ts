import { Injectable } from '@angular/core';
import { KomendaStworzeniaProduktu } from '../komendy/KomendaStworzeniaProduktu';
import { RepozytoriumProduktów } from '../repozytoria/RepozytoriumProduktów';
import { Uzytkownik } from '../modele/Uzytkownik';
import { Produkt } from '../modele/Produkt';
import { KomendaEdycjiProduktu } from '../komendy/KomendaEdycjiProduktu';

@Injectable()
export class PrzetwarzanieProduktu {
    constructor(public repoProduktów: RepozytoriumProduktów) { }


    Pobierz(login:string):Array<Produkt>{
        return this.repoProduktów.PobierzDlaUzytkownika(login);
    }

    Dodaj(komenda: KomendaStworzeniaProduktu): boolean {
        var result = this.repoProduktów.Dodaj(komenda);
        if (result) {
            return true;
        }
        return false;
    }

    UsunPoNazwie(produkt:Produkt){
        var result = this.repoProduktów.UsunPoNazwie(produkt);
        if (result) {
            return true;
        }
        return false;
    }

    Edytuj(komenda:KomendaEdycjiProduktu){
        var result = this.repoProduktów.Edytuj(komenda);
        if (result) {
            return true;
        }
        return false;
    }
}
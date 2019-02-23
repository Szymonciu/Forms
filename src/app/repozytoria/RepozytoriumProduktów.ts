import { LocalDB } from '../pomoce/LocalDB';
import { Injectable } from '@angular/core';
import { Produkt } from '../modele/Produkt';
import { KomendaStworzeniaProduktu } from '../komendy/KomendaStworzeniaProduktu';
import{ KomendaEdycjiProduktu} from '../komendy/KomendaEdycjiProduktu';

@Injectable()
export class RepozytoriumProduktów {
    prfix = "Produkty";
    constructor(public tmpRepo: LocalDB) {
        if (tmpRepo.Get(this.prfix) == null) {
            var Produkty = new Array<Produkt>();
            this.tmpRepo.Add(this.prfix, Produkty);
        }
    }

    Dodaj(komenda: KomendaStworzeniaProduktu): boolean {
        var produkt = this.Pobierz(komenda.Nazwa);
        if (produkt !== null)
            return false;

        produkt = new Produkt(komenda.Nazwa);
        produkt.Ilosc = komenda.Ilość;
        produkt.CenaNetto = komenda.CenaNetto;
        produkt.JednostkaMiary = komenda.JednostkaMiary;
        produkt.LoginUzytkownika = komenda.LoginUzytkownika;
        
        
        var produkty = this.tmpRepo.Get(this.prfix);
        produkty.push(produkt);

        this.tmpRepo.Add(this.prfix, produkty);
        return true;
    }

    Pobierz(nazwa: string): Produkt {
        var produkty = this.tmpRepo.Get(this.prfix);
        if (produkty.length > 0) {
            for (let i = 0; i < produkty.length; i++) {
                if (produkty[i].Nazwa == nazwa) {
                    return produkty[i];
                }
            }
        }
        return null;
    }

    PobierzDlaUzytkownika(login: string): Array<Produkt> {
        var produktyDlaUzytkownika = new Array<Produkt>();
        var produkty = this.tmpRepo.Get(this.prfix);
        if (produkty.length > 0) {
            for (let i = 0; i < produkty.length; i++) {
                if (produkty[i].LoginUzytkownika == login) {
                    produktyDlaUzytkownika.push(produkty[i]);
                }
            }
        }
        return produktyDlaUzytkownika;
    }

    PobierzWszystkie(): Array<Produkt> {
        var produkty = this.tmpRepo.Get(this.prfix);
        return produkty
    }

    UsunPoNazwie(produkt:Produkt){
        var indexOf;
        var produkty = this.PobierzWszystkie();
        for(let i = 0; i< produkty.length;i++){
            if(produkty[i].Nazwa == produkt.Nazwa && produkty[i].LoginUzytkownika == produkt.LoginUzytkownika)
                indexOf = i;
        }
        produkty.splice(indexOf,1);
        this.tmpRepo.Add(this.prfix, produkty);
        return true;
    }

    Edytuj(komenda: KomendaEdycjiProduktu){
        var produkty = this.PobierzWszystkie()
        var produkt:Produkt;

        for(let i = 0; i< produkty.length;i++){
            if(produkty[i].Nazwa == komenda.Nazwa && produkty[i].LoginUzytkownika == komenda.LoginUzytkownika)
            produkt = produkty[i];
                
        }

        produkt.Nazwa = komenda.NowaNazwa;
        produkt.JednostkaMiary = komenda.JednostkaMiary;
        produkt.CenaNetto = komenda.CenaNetto;

        this.tmpRepo.Add(this.prfix, produkty);
        return true;

    }

}
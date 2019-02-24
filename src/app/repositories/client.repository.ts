import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { Client } from "../models/client";
import { ClientAddCommand } from "../commands/client.add.command";
import { ClientEditCommand } from "../commands/client.edit.command";

@Injectable()
export class ClientRepository {
  prfix = "Klienci";
  constructor(public tmpRepo: LocalDB) {
    if (tmpRepo.Get(this.prfix) == null) {
      var Klienci = new Array<Client>();
      this.tmpRepo.Add(this.prfix, Klienci);
    }
  }

  Dodaj(komenda: ClientAddCommand): boolean {
    var klient = this.Pobierz(komenda.Nazwa);
    if (klient !== null) return false;

    klient = new Client(
      komenda.LoginUzytkownika,
      komenda.Opis,
      komenda.Nazwa,
      komenda.NrKontaBankowego,
      komenda.Adres,
      komenda.Nip,
      komenda.NazwaFirmy
    );

    var klienci = this.tmpRepo.Get(this.prfix);
    klienci.push(klient);

    this.tmpRepo.Add(this.prfix, klienci);
    return true;
  }

  Pobierz(nazwa: string): Client {
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

  PobierzDlaUzytkownika(login: string): Array<Client> {
    var klienciDlaUzytkownika = new Array<Client>();
    var klienci = this.tmpRepo.Get(this.prfix);
    if (klienci.length > 0) {
      for (let i = 0; i < klienci.length; i++) {
        if (klienci[i].LoginUzytkownika == login) {
          klienciDlaUzytkownika.push(klienci[i]);
        }
      }
    }
    return klienciDlaUzytkownika;
  }

  PobierzWszystkie(): Array<Client> {
    var klienci = this.tmpRepo.Get(this.prfix);
    return klienci;
  }

  UsunPoNazwie(klient: Client) {
    var indexOf;
    var klienci = this.PobierzWszystkie();
    for (let i = 0; i < klienci.length; i++) {
      if (
        klienci[i].Nazwa == klient.Nazwa &&
        klienci[i].LoginUzytkownika == klient.LoginUzytkownika
      )
        indexOf = i;
    }
    klienci.splice(indexOf, 1);
    this.tmpRepo.Add(this.prfix, klienci);
    return true;
  }

  Edytuj(komenda: ClientEditCommand) {
    var klienci = this.PobierzWszystkie();
    var klient: Client;

    for (let i = 0; i < klienci.length; i++) {
      if (
        klienci[i].Nazwa == komenda.Nazwa &&
        klienci[i].LoginUzytkownika == komenda.LoginUzytkownika
      )
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

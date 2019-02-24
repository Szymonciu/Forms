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
    var klient = this.Pobierz(komenda.Name);
    if (klient !== null) return false;

    klient = new Client(
      komenda.Login,
      komenda.Description,
      komenda.Name,
      komenda.AccountNumber,
      komenda.Address,
      komenda.TaxId,
      komenda.CompanyName
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
      if (klienci[i].Name == klient.Name && klienci[i].Login == klient.Login)
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
      if (klienci[i].Name == komenda.Name && klienci[i].Login == komenda.Login)
        klient = klienci[i];
    }

    klient.Address = komenda.Address;
    klient.AccountNumber = komenda.AccountNumber;
    klient.TaxId = komenda.TaxId;
    klient.CompanyName = komenda.CompanyName;

    this.tmpRepo.Add(this.prfix, klienci);
    return true;
  }
}

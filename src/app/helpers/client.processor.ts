import { Injectable } from "@angular/core";
import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../models/client";
import { ClientAddCommand } from "../commands/client.add.command";
import { ClientEditCommand } from "../commands/client.edit.command";

@Injectable()
export class ClientProcessor {
  constructor(public repoKlientów: ClientRepository) {}

  Pobierz(login: string): Array<Client> {
    return this.repoKlientów.PobierzDlaUzytkownika(login);
  }

  Dodaj(komenda: ClientAddCommand): boolean {
    var result = this.repoKlientów.Dodaj(komenda);
    if (result) {
      return true;
    }
    return false;
  }

  UsunPoNazwie(klient: Client) {
    var result = this.repoKlientów.UsunPoNazwie(klient);
    if (result) {
      return true;
    }
    return false;
  }

  Edytuj(komenda: ClientEditCommand) {
    var result = this.repoKlientów.Edytuj(komenda);
    if (result) {
      return true;
    }
    return false;
  }
}

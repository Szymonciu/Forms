import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { Client } from "../models/client";
import { ClientAddCommand } from "../commands/client.add.command";
import { ClientEditCommand } from "../commands/client.edit.command";

@Injectable()
export class ClientRepository {
  prfix = "Clients";
  constructor(public tmpRepo: LocalDB) {
    if (tmpRepo.Get(this.prfix) == null) {
      var Clients = new Array<Client>();
      this.tmpRepo.Add(this.prfix, Clients);
    }
  }

  Add(command: ClientAddCommand): boolean {
    var client = this.Get(command.Name);
    if (client !== null) return false;

    client = new Client(
      command.Login,
      command.Description,
      command.Name,
      command.AccountNumber,
      command.Address,
      command.TaxId,
      command.CompanyName
    );

    var clients = this.tmpRepo.Get(this.prfix);
    clients.push(client);

    this.tmpRepo.Add(this.prfix, clients);
    return true;
  }

  Get(name: string): Client {
    var clients = this.tmpRepo.Get(this.prfix);
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].Name == name) {
          return clients[i];
        }
      }
    }
    return null;
  }

  GetForUser(login: string): Array<Client> {
    var clientsForUser = new Array<Client>();
    var clients = this.tmpRepo.Get(this.prfix);
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].Login == login) {
          clientsForUser.push(clients[i]);
        }
      }
    }
    return clientsForUser;
  }

  GetAll(): Array<Client> {
    var clients = this.tmpRepo.Get(this.prfix);
    return clients;
  }

  DeleteByName(client: Client) {
    var indexOf;
    var clients = this.GetAll();
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].Name == client.Name && clients[i].Login == client.Login)
        indexOf = i;
    }
    clients.splice(indexOf, 1);
    this.tmpRepo.Add(this.prfix, clients);
    return true;
  }

  Edit(command: ClientEditCommand) {
    var clients = this.GetAll();
    var client: Client;

    for (let i = 0; i < clients.length; i++) {
      if (clients[i].Name == command.Name && clients[i].Login == command.Login)
        client = clients[i];
    }

    client.Address = command.Address;
    client.AccountNumber = command.AccountNumber;
    client.TaxId = command.TaxId;
    client.CompanyName = command.CompanyName;

    this.tmpRepo.Add(this.prfix, clients);
    return true;
  }
}

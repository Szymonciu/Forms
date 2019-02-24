import { Injectable } from "@angular/core";
import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../models/client";
import { ClientAddCommand } from "../commands/client.add.command";
import { ClientEditCommand } from "../commands/client.edit.command";

@Injectable()
export class ClientProcessor {
  constructor(public clientRepository: ClientRepository) {}

  Get(login: string): Array<Client> {
    return this.clientRepository.GetForUser(login);
  }

  Add(command: ClientAddCommand): boolean {
    var result = this.clientRepository.Add(command);
    if (result) {
      return true;
    }
    return false;
  }

  DeleteByName(client: Client) {
    var result = this.clientRepository.DeleteByName(client);
    if (result) {
      return true;
    }
    return false;
  }

  Edit(command: ClientEditCommand) {
    var result = this.clientRepository.Edit(command);
    if (result) {
      return true;
    }
    return false;
  }
}

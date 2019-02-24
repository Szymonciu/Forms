import { TaxPayer } from "./tax.payer";
import { Client } from "./client";

export class User extends TaxPayer {
  Clients: Array<Client>;

  constructor(
    public Login: string,
    public Haslo: string,
    accountNumber: string,
    address: string,
    taxId: string,
    companyName: string
  ) {
    super(accountNumber, address, taxId, companyName);
    this.Clients = new Array<Client>();
  }

  addClient(client: Client) {
    this.Clients.push(client);
  }
}

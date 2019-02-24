import { TaxPayer } from "./tax.payer";
export class Client extends TaxPayer {
  constructor(
    public Login: string,
    public Name: string,
    public Description: string,
    AccountNumber: string,
    Address: string,
    TaxId: string,
    CompanyName: string
  ) {
    super(AccountNumber, Address, TaxId, CompanyName);
  }
}

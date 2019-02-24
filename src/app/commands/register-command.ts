export class RegisterCommand {
  constructor(
    public Login: string,
    public Password: string,
    public AccountNumber: string,
    public Address: string,
    public TaxId: string,
    public CompanyName: string
  ) {}
}

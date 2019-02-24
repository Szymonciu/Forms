export class UserEditCommand {
  constructor(
    public Login: string,
    public AccountNumber: string,
    public Address: string,
    public TaxId: string,
    public CompanyName: string
  ) {}
}

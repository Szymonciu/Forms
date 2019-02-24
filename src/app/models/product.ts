export class Product {
  VatValue: number;
  BruttoValue: number;
  VatTax = 23;
  public Quantity: number;
  public Login: string;
  public NettoPrice: number;
  public Unit: string;

  constructor(public Name: string) {}

  public GetNetValue() {
    return (this.NettoPrice * this.Quantity * this.VatTax) / 100;
  }
  public GetGrossValue() {
    var vat = this.GetNetValue();
    return vat + this.NettoPrice * this.Quantity;
  }
}

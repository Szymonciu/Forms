import { Product } from "../models/product";

export class InvoiceAddCommand {
  public Login: string;
  public ClientLogin: string;
  public Name: string;
  public Description: string;
  public Value: number;
  public CreatedDate: Date;
  public PaymentType: string;
  public PaymentDate: Date;
  public Products: Array<Product>;
  public InvoiceNumber: string;
  public Defined: boolean;
  public Vat: number;
  constructor() {
    this.Products = new Array<Product>();
  }
}

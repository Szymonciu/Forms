import { Invoice } from "./invoice";
import { Product } from "./product";
export class TaxPayer {
  public Invoices: Array<Invoice>;
  public Products: Array<Product>;
  constructor(
    public AccountNumber: string,
    public Address: string,
    public TaxId: string,
    public CompanyName: string
  ) {
    this.Invoices = new Array<Invoice>();
    this.Products = new Array<Product>();
  }

  addInvoice(invoice: Invoice) {
    this.Invoices.push(invoice);
  }

  addProduct(product: Product) {
    this.Products.push(product);
  }
}

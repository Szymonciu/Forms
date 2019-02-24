import { Product } from "../models/product";

export class InvoiceAddCommand {
  public LoginUzytkownika: string;
  public LoginKlienta: string;
  public Nazwa: string;
  public Opis: string;
  public Kwota: number;
  public DataWystawienia: Date;
  public FormaPlatnosci: string;
  public DataPlatnosci: Date;
  public Produkty: Array<Product>;
  public NumerFaktury: string;
  public Zdefinowana: boolean;
  public Vat: number;
  constructor() {
    this.Produkty = new Array<Product>();
  }
}

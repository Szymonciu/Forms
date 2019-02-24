import { Client } from "./client";
import { Product } from "./product";
import { User } from "./user";

export class Invoice {
  public Products: Array<Product>;
  public Client: Client;
  public User: User;
  public Name: string;
  public Description: string;
  public Value: number;
  public Defined: boolean;
  public Historic: boolean;
  public Vat: number;

  constructor(
    public InvoiceNumber: string,
    public Login: string,
    public ClientLogin: string,
    public CreatedDate: Date,
    public ProductIds: Array<Product>,
    public PaymentType: string,
    public PaymentDate: Date
  ) {}
}

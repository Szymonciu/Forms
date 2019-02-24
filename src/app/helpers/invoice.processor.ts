import { Injectable } from "@angular/core";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { UserRepository } from "../repositories/user.repository";
import { ClientRepository } from "../repositories/client.repository";
import { ProductRepository } from "../repositories/product.repository";
import { Invoice } from "../models/invoice";
import { InvoiceAddCommand } from "../commands/invoice.add.command";
import { Product } from "../models/product";

@Injectable()
export class InvoiceProcessor {
  constructor(
    public invoiceRepository: InvoiceRepository,
    public userRepository: UserRepository,
    public clientRepository: ClientRepository,
    public productRepository: ProductRepository
  ) {}

  Invoice: Invoice;
  Defined;
  Percent = 0.23;
  PercentOverall = 1.23;
  InvoiceSummary = {
    Vat: null,
    Brutto: null,
    Netto: null
  };

  Get(login: string): Array<Invoice> {
    var invoices = this.invoiceRepository.GetForUser(login);
    for (let i = 0; i < invoices.length; i++) {
      this.FillInInvoice(invoices[i]);
    }
    return invoices;
  }

  getDefined(login: string): Array<Invoice> {
    var invoices = this.invoiceRepository.GetDefined(login);
    for (let i = 0; i < invoices.length; i++) {
      this.FillInInvoice(invoices[i]);
    }
    return invoices;
  }

  Add(command: InvoiceAddCommand): boolean {
    var result = this.invoiceRepository.Add(command);
    if (result) {
      return true;
    }
    return false;
  }

  GetByNumber(invoiceNumber: string, userLogin: string) {
    var invoice = this.invoiceRepository.GetByNumber(invoiceNumber, userLogin);
    this.FillInInvoice(invoice);
    this.Invoice = invoice;
    return invoice;
  }

  FillInInvoice(invoice: Invoice) {
    var user = this.userRepository.Get(invoice.Login);
    var client = this.clientRepository.Get(invoice.ClientLogin);
    var products = new Array<Product>();
    for (let i = 0; i < invoice.ProductIds.length; i++) {
      let product = this.productRepository.Get(invoice.ProductIds[i].Name);
      if (product != undefined && product != null) {
        product.Quantity = invoice.ProductIds[i].Quantity;
        products.push(product);
      }
    }
    invoice.User = user;
    invoice.Client = client;
    invoice.Products = products;
  }

  GenerateInvoiceNumber(userLogin: string): string {
    var invoiceNumber = "";
    var now = new Date();
    var i = 1;
    do {
      invoiceNumber =
        i.toString() + "/" + now.getMonth() + "/" + now.getFullYear();

      var is = this.invoiceRepository.GetByNumber(invoiceNumber, userLogin);

      if (is != null) i++;
      else return invoiceNumber;
    } while (true);
  }

  CalculateForInvoice() {
    this.Percent = this.Invoice.Vat / 100;
    this.PercentOverall = this.Percent + 1;

    this.InvoiceSummary.Vat = 0;
    this.InvoiceSummary.Netto = 0;
    this.InvoiceSummary.Brutto = 0;
    for (let i = 0; i < this.Invoice.Products.length; i++) {
      this.InvoiceSummary.Vat =
        this.InvoiceSummary.Vat +
        this.Invoice.Products[i].NettoPrice *
          this.Invoice.Products[i].Quantity *
          this.Percent;
      this.InvoiceSummary.Netto =
        this.InvoiceSummary.Netto +
        this.Invoice.Products[i].NettoPrice * this.Invoice.Products[i].Quantity;
      this.InvoiceSummary.Brutto =
        this.InvoiceSummary.Brutto +
        this.Invoice.Products[i].NettoPrice *
          this.Invoice.Products[i].Quantity *
          this.PercentOverall;
    }
    this.InvoiceSummary.Vat = this.precisionRound(this.InvoiceSummary.Vat, 2);
    this.InvoiceSummary.Netto = this.precisionRound(
      this.InvoiceSummary.Netto,
      2
    );
    this.InvoiceSummary.Brutto = this.precisionRound(
      this.InvoiceSummary.Brutto,
      2
    );
  }
  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  Delete(invoice: Invoice) {
    this.invoiceRepository.Delete(invoice);
  }
  DeleteByName(invoice: Invoice) {
    this.invoiceRepository.DeleteByName(invoice);
  }
}

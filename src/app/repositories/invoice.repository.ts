import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { InvoiceAddCommand } from "../commands/invoice.add.command";
import { Invoice } from "../models/invoice";

@Injectable()
export class InvoiceRepository {
  prfix = "Invoices";
  constructor(public tmpRepo: LocalDB) {
    if (tmpRepo.Get(this.prfix) == null) {
      var invoices = new Array<Invoice>();
      this.tmpRepo.Add(this.prfix, invoices);
    }
  }

  Add(command: InvoiceAddCommand): boolean {
    var invoice: Invoice;
    var isDefined = false;
    if (command.Name != undefined && command.Name != null) {
      invoice = this.Get(command.Name);
      isDefined = true;
      if (invoice !== null) return false;
    }

    invoice = new Invoice(
      command.InvoiceNumber,
      command.Login,
      command.ClientLogin,
      command.CreatedDate,
      command.Products,
      command.PaymentType,
      command.PaymentDate
    );
    invoice.Value = command.Value;
    invoice.Defined = command.Defined;
    invoice.Vat = command.Vat;

    if (isDefined) {
      invoice.Name = command.Name;
      invoice.Description = command.Description;
    }

    var invoices = this.tmpRepo.Get(this.prfix);
    invoices.push(invoice);

    this.tmpRepo.Add(this.prfix, invoices);
    return true;
  }

  Get(name: string): Invoice {
    var invoices = this.tmpRepo.Get(this.prfix);
    if (invoices.length > 0) {
      for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].Nazwa == name) {
          return invoices[i];
        }
      }
    }
    return null;
  }

  GetByNumber(invoiceNumber: string, login: string): Invoice {
    var invoices = this.tmpRepo.Get(this.prfix);
    if (invoices.length > 0) {
      for (let i = 0; i < invoices.length; i++) {
        if (
          invoices[i].InvoiceNumber == invoiceNumber &&
          invoices[i].Login == login
        ) {
          return invoices[i];
        }
      }
    }
    return null;
  }

  GetForUser(login: string): Array<Invoice> {
    var invoicesForUser = new Array<Invoice>();
    var invoices = this.tmpRepo.Get(this.prfix);
    if (invoices.length > 0) {
      for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].Login == login) {
          invoicesForUser.push(invoices[i]);
        }
      }
    }
    return invoicesForUser;
  }

  GetDefined(login: string): Array<Invoice> {
    var invoicesForUser = new Array<Invoice>();
    var invoices = this.tmpRepo.Get(this.prfix);
    if (invoices.length > 0) {
      for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].Defined === true && invoices[i].Login == login) {
          invoices[i].InvoiceNumber = "";
          invoicesForUser.push(invoices[i]);
        }
      }
    }
    return invoicesForUser;
  }

  Delete(invoice: Invoice) {
    var invoices = this.tmpRepo.Get(this.prfix);
    var indexOf = -1;
    for (let i = 0; i < invoices.length; i++) {
      if (
        invoices[i].InvoiceNumber === invoice.InvoiceNumber &&
        invoices[i].Login == invoice.Login
      )
        indexOf = i;
    }
    if (indexOf != -1) invoices.splice(indexOf, 1);

    this.tmpRepo.Add(this.prfix, invoices);
    return true;
  }

  DeleteByName(invoice: Invoice) {
    var invoices = this.tmpRepo.Get(this.prfix);
    var indexOf = -1;
    for (let i = 0; i < invoices.length; i++) {
      if (
        invoices[i].Name === invoice.Name &&
        invoices[i].Login == invoice.Login &&
        invoices[i].Defined == true
      )
        indexOf = i;
    }
    if (indexOf != -1) invoices.splice(indexOf, 1);

    this.tmpRepo.Add(this.prfix, invoices);
    return true;
  }
}

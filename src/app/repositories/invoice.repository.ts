import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { InvoiceAddCommand } from "../commands/invoice.add.command";
import { Invoice } from "../models/invoice";

@Injectable()
export class InvoiceRepository {
  prfix = "Faktury";
  constructor(public tmpRepo: LocalDB) {
    if (tmpRepo.Get(this.prfix) == null) {
      var Faktury = new Array<Invoice>();
      this.tmpRepo.Add(this.prfix, Faktury);
    }
  }

  Dodaj(komenda: InvoiceAddCommand): boolean {
    var faktura: Invoice;
    var isDefined = false;
    if (komenda.Name != undefined && komenda.Name != null) {
      faktura = this.Pobierz(komenda.Name);
      isDefined = true;
      if (faktura !== null) return false;
    }

    faktura = new Invoice(
      komenda.InvoiceNumber,
      komenda.Login,
      komenda.ClientLogin,
      komenda.CreatedDate,
      komenda.Products,
      komenda.PaymentType,
      komenda.PaymentDate
    );
    faktura.Value = komenda.Value;
    faktura.Defined = komenda.Defined;
    faktura.Vat = komenda.Vat;

    if (isDefined) {
      faktura.Name = komenda.Name;
      faktura.Description = komenda.Description;
    }

    var faktury = this.tmpRepo.Get(this.prfix);
    faktury.push(faktura);

    this.tmpRepo.Add(this.prfix, faktury);
    return true;
  }

  Pobierz(nazwa: string): Invoice {
    var faktury = this.tmpRepo.Get(this.prfix);
    if (faktury.length > 0) {
      for (let i = 0; i < faktury.length; i++) {
        if (faktury[i].Nazwa == nazwa) {
          return faktury[i];
        }
      }
    }
    return null;
  }

  PobierzPoNumerze(numerFaktury: string, loginUzytkownika: string): Invoice {
    var faktury = this.tmpRepo.Get(this.prfix);
    if (faktury.length > 0) {
      for (let i = 0; i < faktury.length; i++) {
        if (
          faktury[i].NumerFaktury == numerFaktury &&
          faktury[i].LoginUzytkownika == loginUzytkownika
        ) {
          return faktury[i];
        }
      }
    }
    return null;
  }

  PobierzDlaUzytkownika(login: string): Array<Invoice> {
    var fakturyDlaUzytkownika = new Array<Invoice>();
    var faktury = this.tmpRepo.Get(this.prfix);
    if (faktury.length > 0) {
      for (let i = 0; i < faktury.length; i++) {
        if (faktury[i].LoginUzytkownika == login) {
          fakturyDlaUzytkownika.push(faktury[i]);
        }
      }
    }
    return fakturyDlaUzytkownika;
  }

  PobierzZdefiniowane(loginUzytkownika: string): Array<Invoice> {
    var fakturyDlaUzytkownika = new Array<Invoice>();
    var faktury = this.tmpRepo.Get(this.prfix);
    if (faktury.length > 0) {
      for (let i = 0; i < faktury.length; i++) {
        if (
          faktury[i].Zdefiniowana === true &&
          faktury[i].LoginUzytkownika == loginUzytkownika
        ) {
          faktury[i].NumerFaktury = "";
          fakturyDlaUzytkownika.push(faktury[i]);
        }
      }
    }
    return fakturyDlaUzytkownika;
  }

  Usun(faktura: Invoice) {
    var faktury = this.tmpRepo.Get(this.prfix);
    var indexOf = -1;
    for (let i = 0; i < faktury.length; i++) {
      if (
        faktury[i].NumerFaktury === faktura.InvoiceNumber &&
        faktury[i].LoginUzytkownika == faktura.Login
      )
        indexOf = i;
    }
    if (indexOf != -1) faktury.splice(indexOf, 1);

    this.tmpRepo.Add(this.prfix, faktury);
    return true;
  }

  UsunPoNazwie(faktura: Invoice) {
    var faktury = this.tmpRepo.Get(this.prfix);
    var indexOf = -1;
    for (let i = 0; i < faktury.length; i++) {
      if (
        faktury[i].Nazwa === faktura.Name &&
        faktury[i].LoginUzytkownika == faktura.Login &&
        faktury[i].Zdefiniowana == true
      )
        indexOf = i;
    }
    if (indexOf != -1) faktury.splice(indexOf, 1);

    this.tmpRepo.Add(this.prfix, faktury);
    return true;
  }
}

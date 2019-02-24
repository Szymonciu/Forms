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
    public repoFaktur: InvoiceRepository,
    public repoUzytkownika: UserRepository,
    public repoKlientów: ClientRepository,
    public repoProduktów: ProductRepository
  ) {}

  Invoice: Invoice;
  Defined;
  Procent = 0.23;
  ProcentCaly = 1.23;
  FakturaPodsumowanie = {
    Vat: null,
    Brutto: null,
    Netto: null
  };

  Pobierz(login: string): Array<Invoice> {
    var faktury = this.repoFaktur.PobierzDlaUzytkownika(login);
    for (let i = 0; i < faktury.length; i++) {
      this.UzupełnijFakture(faktury[i]);
    }
    return faktury;
  }

  getDefined(login: string): Array<Invoice> {
    var faktury = this.repoFaktur.PobierzZdefiniowane(login);
    for (let i = 0; i < faktury.length; i++) {
      this.UzupełnijFakture(faktury[i]);
    }
    return faktury;
  }

  Dodaj(komenda: InvoiceAddCommand): boolean {
    var result = this.repoFaktur.Dodaj(komenda);
    if (result) {
      return true;
    }
    return false;
  }

  PobierzPoNumerze(nrFaktury: string, loginUzytkownika: string) {
    var faktura = this.repoFaktur.PobierzPoNumerze(nrFaktury, loginUzytkownika);
    this.UzupełnijFakture(faktura);
    this.Invoice = faktura;
    return faktura;
  }

  UzupełnijFakture(faktura: Invoice) {
    var uzytkownik = this.repoUzytkownika.Pobierz(faktura.Login);
    var klient = this.repoKlientów.Pobierz(faktura.ClientLogin);
    var produkty = new Array<Product>();
    for (let i = 0; i < faktura.Products.length; i++) {
      let produkt = this.repoProduktów.Pobierz(faktura.Products[i].Name);
      if (produkt != undefined && produkt != null) {
        produkt.Quantity = faktura.Products[i].Quantity;
        produkty.push(produkt);
      }
    }
    faktura.User = uzytkownik;
    faktura.Client = klient;
    faktura.Products = produkty;
  }

  WygenerujNumerFaktury(loginUzytkownika: string): string {
    var nrFaktury = "";
    var now = new Date();
    var i = 1;
    do {
      nrFaktury = i.toString() + "/" + now.getMonth() + "/" + now.getFullYear();

      var is = this.repoFaktur.PobierzPoNumerze(nrFaktury, loginUzytkownika);

      if (is != null) i++;
      else return nrFaktury;
    } while (true);
  }

  WyliczDlaFaktury() {
    this.Procent = this.Invoice.Vat / 100;
    this.ProcentCaly = this.Procent + 1;

    this.FakturaPodsumowanie.Vat = 0;
    this.FakturaPodsumowanie.Netto = 0;
    this.FakturaPodsumowanie.Brutto = 0;
    for (let i = 0; i < this.Invoice.Products.length; i++) {
      this.FakturaPodsumowanie.Vat =
        this.FakturaPodsumowanie.Vat +
        this.Invoice.Products[i].NettoPrice *
          this.Invoice.Products[i].Quantity *
          this.Procent;
      this.FakturaPodsumowanie.Netto =
        this.FakturaPodsumowanie.Netto +
        this.Invoice.Products[i].NettoPrice * this.Invoice.Products[i].Quantity;
      this.FakturaPodsumowanie.Brutto =
        this.FakturaPodsumowanie.Brutto +
        this.Invoice.Products[i].NettoPrice *
          this.Invoice.Products[i].Quantity *
          this.ProcentCaly;
    }
    this.FakturaPodsumowanie.Vat = this.precisionRound(
      this.FakturaPodsumowanie.Vat,
      2
    );
    this.FakturaPodsumowanie.Netto = this.precisionRound(
      this.FakturaPodsumowanie.Netto,
      2
    );
    this.FakturaPodsumowanie.Brutto = this.precisionRound(
      this.FakturaPodsumowanie.Brutto,
      2
    );
  }
  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  Usun(faktura: Invoice) {
    this.repoFaktur.Usun(faktura);
  }
  DeleteByName(faktura: Invoice) {
    this.repoFaktur.UsunPoNazwie(faktura);
  }
}

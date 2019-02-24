import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvoiceProcessor } from "../helpers/invoice.processor";
import { UserAuthorizer } from "../helpers/user.authorizer";
import { Invoice } from "../models/invoice";

@Component({
  selector: "app-historyczne-faktury",
  templateUrl: "./historic.invoices.component.html",
  styleUrls: ["./historic.invoices.component.css"]
})
export class HistoricInvoicesComponent implements OnInit {
  faktury: Array<Invoice>;
  constructor(
    private router: Router,
    public przetFaktur: InvoiceProcessor,
    public logowanieUzyt: UserAuthorizer
  ) {
    this.faktury = przetFaktur.Pobierz(logowanieUzyt.getCurrentuser().Login);
  }

  wybierzFakture(faktura: Invoice) {
    this.przetFaktur.Invoice = faktura;
    this.przetFaktur.WyliczDlaFaktury();
    this.router.navigate(["faktura"]);
  }
  ngOnInit() {}

  usun(faktura: Invoice) {
    this.przetFaktur.Usun(faktura);
    this.faktury = this.przetFaktur.Pobierz(
      this.logowanieUzyt.getCurrentuser().Login
    );
  }
}

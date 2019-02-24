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
  invoices: Array<Invoice>;
  constructor(
    private router: Router,
    public invoiceProcessor: InvoiceProcessor,
    public userAuthorizer: UserAuthorizer
  ) {
    this.invoices = invoiceProcessor.Get(userAuthorizer.GetCurrentUser().Login);
  }

  chooseInvoice(invoice: Invoice) {
    this.invoiceProcessor.Invoice = invoice;
    this.invoiceProcessor.CalculateForInvoice();
    this.router.navigate(["faktura"]);
  }
  ngOnInit() {}

  delete(invoice: Invoice) {
    this.invoiceProcessor.Delete(invoice);
    this.invoices = this.invoiceProcessor.Get(
      this.userAuthorizer.GetCurrentUser().Login
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Router } from "@angular/router";
import { Invoice } from "../models/invoice";
import { InvoiceProcessor } from "../helpers/invoice.processor";

@Component({
  selector: "app-faktura",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"]
})
export class InvoiceComponent implements OnInit {
  invoice: Invoice;
  vat;
  vatOverall;
  summary;
  constructor(
    private router: Router,
    private invoiceProcessor: InvoiceProcessor
  ) {}

  ngOnInit() {
    this.invoice = this.invoiceProcessor.Invoice;
    this.vat = this.invoiceProcessor.Percent;
    this.vatOverall = this.invoiceProcessor.PercentOverall;
    this.summary = this.invoiceProcessor.InvoiceSummary;
  }

  print() {
    var printContents = document.getElementById("InvoicePrint").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  back1() {
    this.router.navigate(["dom"]);
  }
}

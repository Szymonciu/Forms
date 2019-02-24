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
  faktura: Invoice;
  vat;
  vatCaly;
  podsumowanie;
  constructor(private router: Router, private przetFaktury: InvoiceProcessor) {}

  ngOnInit() {
    this.faktura = this.przetFaktury.Faktura;
    this.vat = this.przetFaktury.Procent;
    this.vatCaly = this.przetFaktury.ProcentCaly;
    this.podsumowanie = this.przetFaktury.FakturaPodsumowanie;
  }
  print() {
    var printContents = document.getElementById("FakturaPrint").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  back1() {
    this.router.navigate(["dom"]);
  }
}

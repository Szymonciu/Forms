import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { FormControl } from "@angular/forms";
import { filter } from "rxjs/operators";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OnChanges } from "@angular/core";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from "rxjs";
import { Invoice } from "../models/invoice";
import { User } from "../models/user";
import { Client } from "../models/client";
import { Product } from "../models/product";
import { DefinedInvoiceDialog } from "../dialogs/defined.invoice.dialog";
import { ClientAddCommand } from "../commands/client.add.command";
import { InvoiceAddCommand } from "../commands/invoice.add.command";
import { ProductAddCommand } from "../commands/product.add.command";
import { InvoiceProcessor } from "../helpers/invoice.processor";
import { ClientProcessor } from "../helpers/client.processor";
import { UserAuthorizer } from "../helpers/user.authorizer";
import { ProductProcessor } from "../helpers/product.processor";

@Component({
  selector: "app-nowa-faktura",
  templateUrl: "./invoice.add.component.html",
  styleUrls: ["./invoice.add.component.css"]
})
export class InvoiceAddComponent implements OnInit {
  vat = 23;
  brakKlienta;
  brakProduktu;
  error = false;
  zdefiniowanaDialof: MatDialogRef<DefinedInvoiceDialog>;
  faktura: Invoice;
  procentVat = 0.23;
  procentVatCaly = 1.23;
  zdefinowano = false;
  nrFaktury: string;
  uzytkownik: User;
  klienci: Array<Client>;
  produkty: Array<Product>;
  produktyWybrane: Array<Product>;
  wybranyKlient = {
    TaxId: null,
    Address: null,
    CompanyName: null,
    Name: null
  };
  podsumowanie = {
    Vat: null,
    Brutto: null,
    Netto: null
  };
  pokazFormularzKlienta = false;
  udaloSieDodacKlienta = false;
  udaloSieDodacProdukt = false;
  pokazFakture = false;
  blad = false;
  komendaStworzeniaKlienta: ClientAddCommand;
  komendaStworzeniaFaktury: InvoiceAddCommand;
  komendaStworzeniaProduktu: ProductAddCommand;
  toppings: FormControl = new FormControl();
  filteredOptions: Observable<Array<Client>>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private przetFaktury: InvoiceProcessor,
    private przetKlienta: ClientProcessor,
    private logowanieUzytkownika: UserAuthorizer,
    private przetProduktu: ProductProcessor
  ) {
    this.komendaStworzeniaKlienta = new ClientAddCommand();
    this.komendaStworzeniaFaktury = new InvoiceAddCommand();
    var now = new Date();
    this.komendaStworzeniaFaktury.PaymentDate = now;
    this.komendaStworzeniaFaktury.CreatedDate = now;
    this.komendaStworzeniaProduktu = new ProductAddCommand();
    this.produktyWybrane = new Array<Product>();
    this.uzytkownik = logowanieUzytkownika.getCurrentuser();
    this.pobierzKlientów();
    this.pobierzProdukty();
    this.nrFaktury = this.przetFaktury.WygenerujNumerFaktury(
      this.uzytkownik.Login
    );
    this.czyZdefiniowana();
  }

  pobierzKlientów() {
    this.klienci = this.przetKlienta.Get(this.uzytkownik.Login);
  }
  czyZdefiniowana() {
    if (this.przetFaktury.Defined) {
      var fakturaZapisana = this.przetFaktury.Invoice;
      this.wybierzKlienta(fakturaZapisana.Client);
      this.komendaStworzeniaFaktury.PaymentType = fakturaZapisana.PaymentType;
      this.komendaStworzeniaFaktury.Vat = fakturaZapisana.Vat;
      this.vat = fakturaZapisana.Vat;
      for (let i = 0; i < fakturaZapisana.Products.length; i++) {
        this.produktyWybrane.push(fakturaZapisana.Products[i]);
      }

      this.wyliczPodsumowanie();
      this.komendaStworzeniaFaktury.Products = this.produktyWybrane;
    }
    this.przetFaktury.Defined = false;
  }

  otworzDialog() {
    if (this.sprawdz()) {
      this.snackBar.open("Uzupełnij wymagane pola!", "", {
        duration: 2000
      });
      return;
    }
    this.zdefiniowanaDialof = this.dialog.open(DefinedInvoiceDialog, {
      hasBackdrop: false
    });

    this.zdefiniowanaDialof
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        this.komendaStworzeniaFaktury.Name = name;
        this.zdefinuj();
      });
  }

  dodajKlienta() {
    this.komendaStworzeniaKlienta.Login = this.uzytkownik.Login;
    var result = this.przetKlienta.Dodaj(this.komendaStworzeniaKlienta);

    if (result) {
      this.komendaStworzeniaKlienta = new ClientAddCommand();
      this.udaloSieDodacKlienta = true;
      this.snackBar.open("Dodano nowego klienta!", "", {
        duration: 2000
      });
      this.pobierzKlientów();
    } else {
      this.snackBar.open("Nie udało się!", "", {
        duration: 2000
      });
    }
  }

  ustawVat(value) {
    this.procentVat = value / 100;
    this.procentVatCaly = 1 + this.procentVat;
    this.przetFaktury.Procent = this.procentVat;
    this.przetFaktury.ProcentCaly = this.procentVatCaly;
  }

  pobierzProdukty() {
    this.produkty = this.przetProduktu.Get(this.uzytkownik.Login);
    console.log(this.produkty);
  }

  dodajProdukt() {
    this.komendaStworzeniaProduktu.Login = this.uzytkownik.Login;
    var result = this.przetProduktu.Dodaj(this.komendaStworzeniaProduktu);

    if (result) {
      this.komendaStworzeniaProduktu = new ProductAddCommand();
      this.udaloSieDodacProdukt = true;
      this.pobierzProdukty();
      this.snackBar.open("Dodano nowy produkt!", "", {
        duration: 2000
      });
    } else {
      this.snackBar.open("Nie udało się!", "", {
        duration: 2000
      });
    }
  }

  wyliczPodsumowanie() {
    this.podsumowanie.Vat = 0;
    this.podsumowanie.Netto = 0;
    this.podsumowanie.Brutto = 0;
    for (let i = 0; i < this.produktyWybrane.length; i++) {
      this.podsumowanie.Vat =
        this.podsumowanie.Vat +
        this.produktyWybrane[i].NettoPrice *
          this.produktyWybrane[i].Quantity *
          this.procentVat;
      this.podsumowanie.Netto =
        this.podsumowanie.Netto +
        this.produktyWybrane[i].NettoPrice * this.produktyWybrane[i].Quantity;
      this.podsumowanie.Brutto =
        this.podsumowanie.Brutto +
        this.produktyWybrane[i].NettoPrice *
          this.produktyWybrane[i].Quantity *
          this.procentVatCaly;
    }
    this.podsumowanie.Vat = this.precisionRound(this.podsumowanie.Vat, 2);
    this.podsumowanie.Netto = this.precisionRound(this.podsumowanie.Netto, 2);
    this.podsumowanie.Brutto = this.precisionRound(this.podsumowanie.Brutto, 2);

    this.przetFaktury.FakturaPodsumowanie = this.podsumowanie;
  }

  wybierzKlienta(klient: Client) {
    this.wybranyKlient = klient;
    this.komendaStworzeniaFaktury.ClientLogin = klient.Name;
  }

  wybierzProdukty(produkt: Product) {
    if (this.produktyWybrane.includes(produkt)) this.usunProdukt(produkt);
    else {
      produkt.Quantity = 1;
      this.produktyWybrane.push(produkt);
    }
    this.wyliczPodsumowanie();
    this.komendaStworzeniaFaktury.Products = this.produktyWybrane;
  }

  usunProdukt(produkt: Product) {
    var index = this.produktyWybrane.indexOf(produkt, 0);
    if (index > -1) {
      this.produktyWybrane.splice(index, 1);
    }
  }

  wystawFakture() {
    if (this.sprawdz()) {
      this.snackBar.open("Uzupełnij wymagane pola!", "", {
        duration: 2000
      });
      return;
    }
    if (this.zdefinowano != true) {
      this.faktura = this.nowaFaktura(false);
      this.router.navigate(["faktura"]);
    } else {
      this.router.navigate(["faktura"]);
    }
  }
  zdefinuj() {
    if (this.sprawdz()) {
      this.snackBar.open("Uzupełnij wymagane pola!", "", {
        duration: 2000
      });
      return;
    }

    this.faktura = this.nowaFaktura(true);
    this.zdefinowano = true;
    this.snackBar.open("Zapisano fakture!", "", {
      duration: 2000
    });
  }

  sprawdz() {
    if (
      this.komendaStworzeniaFaktury.ClientLogin === null ||
      this.komendaStworzeniaFaktury.ClientLogin === undefined ||
      this.komendaStworzeniaFaktury.ClientLogin == ""
    )
      return true;
    if (
      this.komendaStworzeniaFaktury.CreatedDate === null ||
      this.komendaStworzeniaFaktury.CreatedDate === undefined ||
      this.komendaStworzeniaFaktury.PaymentDate == null ||
      this.komendaStworzeniaFaktury.PaymentDate == undefined
    )
      return true;
    if (
      this.komendaStworzeniaFaktury.Products === null ||
      this.komendaStworzeniaFaktury.Products === undefined ||
      this.komendaStworzeniaFaktury.Products.length <= 0
    )
      return true;
  }

  nowaFaktura(zdefinowano) {
    this.komendaStworzeniaFaktury.Login = this.uzytkownik.Login;
    this.komendaStworzeniaFaktury.InvoiceNumber = this.nrFaktury;
    this.komendaStworzeniaFaktury.Vat = this.vat;
    if (zdefinowano) {
      this.komendaStworzeniaFaktury.Defined = true;
    }

    this.przetFaktury.Dodaj(this.komendaStworzeniaFaktury);

    return this.przetFaktury.PobierzPoNumerze(
      this.nrFaktury,
      this.uzytkownik.Login
    );
  }

  przelicz() {
    this.wyliczPodsumowanie();
  }

  ngOnInit() {}

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  dopiszKlienta() {
    if (this.klienci.length <= 0) this.brakKlienta = true;
    else this.brakKlienta = false;
  }
  dopiszProdukt() {
    if (this.produkty.length <= 0) this.brakProduktu = true;
    else this.brakProduktu = false;
  }
}

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
    Nip: null,
    Adres: null,
    NazwaFirmy: null,
    Nazwa: null
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
    this.komendaStworzeniaFaktury.DataPlatnosci = now;
    this.komendaStworzeniaFaktury.DataWystawienia = now;
    this.komendaStworzeniaProduktu = new ProductAddCommand();
    this.produktyWybrane = new Array<Product>();
    this.uzytkownik = logowanieUzytkownika.ZalogowanyUzytkownik();
    this.pobierzKlientów();
    this.pobierzProdukty();
    this.nrFaktury = this.przetFaktury.WygenerujNumerFaktury(
      this.uzytkownik.Login
    );
    this.czyZdefiniowana();
  }

  pobierzKlientów() {
    this.klienci = this.przetKlienta.Pobierz(this.uzytkownik.Login);
  }
  czyZdefiniowana() {
    if (this.przetFaktury.Zdefiniowana) {
      var fakturaZapisana = this.przetFaktury.Faktura;
      this.wybierzKlienta(fakturaZapisana.Klient);
      this.komendaStworzeniaFaktury.FormaPlatnosci =
        fakturaZapisana.FormaPlatnosci;
      this.komendaStworzeniaFaktury.Vat = fakturaZapisana.Vat;
      this.vat = fakturaZapisana.Vat;
      for (let i = 0; i < fakturaZapisana.Produkty.length; i++) {
        this.produktyWybrane.push(fakturaZapisana.Produkty[i]);
      }

      this.wyliczPodsumowanie();
      this.komendaStworzeniaFaktury.Produkty = this.produktyWybrane;
    }
    this.przetFaktury.Zdefiniowana = false;
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
        this.komendaStworzeniaFaktury.Nazwa = name;
        this.zdefinuj();
      });
  }

  dodajKlienta() {
    this.komendaStworzeniaKlienta.LoginUzytkownika = this.uzytkownik.Login;
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
    this.produkty = this.przetProduktu.Pobierz(this.uzytkownik.Login);
    console.log(this.produkty);
  }

  dodajProdukt() {
    this.komendaStworzeniaProduktu.LoginUzytkownika = this.uzytkownik.Login;
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
        this.produktyWybrane[i].CenaNetto *
          this.produktyWybrane[i].Ilosc *
          this.procentVat;
      this.podsumowanie.Netto =
        this.podsumowanie.Netto +
        this.produktyWybrane[i].CenaNetto * this.produktyWybrane[i].Ilosc;
      this.podsumowanie.Brutto =
        this.podsumowanie.Brutto +
        this.produktyWybrane[i].CenaNetto *
          this.produktyWybrane[i].Ilosc *
          this.procentVatCaly;
    }
    this.podsumowanie.Vat = this.precisionRound(this.podsumowanie.Vat, 2);
    this.podsumowanie.Netto = this.precisionRound(this.podsumowanie.Netto, 2);
    this.podsumowanie.Brutto = this.precisionRound(this.podsumowanie.Brutto, 2);

    this.przetFaktury.FakturaPodsumowanie = this.podsumowanie;
  }

  wybierzKlienta(klient: Client) {
    this.wybranyKlient = klient;
    this.komendaStworzeniaFaktury.LoginKlienta = klient.Nazwa;
  }

  wybierzProdukty(produkt: Product) {
    if (this.produktyWybrane.includes(produkt)) this.usunProdukt(produkt);
    else {
      produkt.Ilosc = 1;
      this.produktyWybrane.push(produkt);
    }
    this.wyliczPodsumowanie();
    this.komendaStworzeniaFaktury.Produkty = this.produktyWybrane;
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
      this.komendaStworzeniaFaktury.LoginKlienta === null ||
      this.komendaStworzeniaFaktury.LoginKlienta === undefined ||
      this.komendaStworzeniaFaktury.LoginKlienta == ""
    )
      return true;
    if (
      this.komendaStworzeniaFaktury.DataWystawienia === null ||
      this.komendaStworzeniaFaktury.DataWystawienia === undefined ||
      this.komendaStworzeniaFaktury.DataPlatnosci == null ||
      this.komendaStworzeniaFaktury.DataPlatnosci == undefined
    )
      return true;
    if (
      this.komendaStworzeniaFaktury.Produkty === null ||
      this.komendaStworzeniaFaktury.Produkty === undefined ||
      this.komendaStworzeniaFaktury.Produkty.length <= 0
    )
      return true;
  }

  nowaFaktura(zdefinowano) {
    this.komendaStworzeniaFaktury.LoginUzytkownika = this.uzytkownik.Login;
    this.komendaStworzeniaFaktury.NumerFaktury = this.nrFaktury;
    this.komendaStworzeniaFaktury.Vat = this.vat;
    if (zdefinowano) {
      this.komendaStworzeniaFaktury.Zdefinowana = true;
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
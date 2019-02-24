import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Invoice } from "../models/invoice";
import { Client } from "../models/client";
import { User } from "../models/user";
import { Product } from "../models/product";
import { ClientEditCommand } from "../commands/client.edit.command";
import { ProductEditCommand } from "../commands/product.edit.command";
import { ProductEditDialog } from "../dialogs/product.edit.dialog";
import { ClientEditDialog } from "../dialogs/client.edit.dialog";
import { ClientProcessor } from "../helpers/client.processor";
import { ProductProcessor } from "../helpers/product.processor";
import { Router } from "@angular/router";
import { InvoiceProcessor } from "../helpers/invoice.processor";
import { UserAuthorizer } from "../helpers/user.authorizer";

@Component({
  selector: "app-zdefiniowane-faktury",
  templateUrl: "./defined-invoices-component.html",
  styleUrls: ["./defined-invoices-component.css"]
})
export class DefinedInvoicesComponent implements OnInit {
  faktury: Array<Invoice>;
  klienci: Array<Client>;
  uzytkownik: User;
  produkty: Array<Product>;
  komendaEdycjiKlienta: ClientEditCommand;
  komendaEdycjiProduktu: ProductEditCommand;
  produktDialog: MatDialogRef<ProductEditDialog>;
  klientDialog: MatDialogRef<ClientEditDialog>;

  constructor(
    public dialog: MatDialog,
    private przetKlienta: ClientProcessor,
    private przetProduktu: ProductProcessor,
    private router: Router,
    public przetFaktur: InvoiceProcessor,
    public logowanieUzyt: UserAuthorizer
  ) {
    this.uzytkownik = logowanieUzyt.ZalogowanyUzytkownik();
    this.faktury = przetFaktur.PobierzZdefiniowane(this.uzytkownik.Login);
    this.komendaEdycjiProduktu = new ProductEditCommand();
    this.komendaEdycjiKlienta = new ClientEditCommand();
    this.pobierzKlientów();
    this.pobierzProdukty();
  }

  pobierzKlientów() {
    this.klienci = this.przetKlienta.Pobierz(this.uzytkownik.Login);
  }
  pobierzProdukty() {
    this.produkty = this.przetProduktu.Pobierz(this.uzytkownik.Login);
  }

  wybierzFakture(faktura: Invoice) {
    this.przetFaktur.Faktura = faktura;
    this.przetFaktur.Zdefiniowana = true;
    this.router.navigate(["nowa"]);
  }
  ngOnInit() {}

  edytujProdukt(produkt: Product) {
    this.produktDialog = this.dialog.open(ProductEditDialog, {
      hasBackdrop: false,
      width: "500px",
      data: {
        nazwa: produkt.Nazwa,
        cenaNetto: produkt.CenaNetto,
        jednostkaMiary: produkt.JednostkaMiary
      }
    });

    this.produktDialog.afterClosed().subscribe(rezultat => {
      if (rezultat != "") this.edytujProduktAkcja(rezultat, produkt);
    });
  }

  edytujKlienta(klient: Client) {
    this.klientDialog = this.dialog.open(ClientEditDialog, {
      hasBackdrop: false,
      width: "500px",
      data: {
        nazwaFirmy: klient.NazwaFirmy,
        adres: klient.Adres,
        nrBanku: klient.NrKontaBankowego,
        nip: klient.Nip
      }
    });

    this.klientDialog.afterClosed().subscribe(rezultat => {
      if (rezultat != "") this.edytujKlientaAkcja(rezultat, klient);
    });
  }

  usun(faktura: Invoice) {
    this.przetFaktur.UsunPoNazwie(faktura);
    this.faktury = this.przetFaktur.PobierzZdefiniowane(
      this.logowanieUzyt.ZalogowanyUzytkownik().Login
    );
  }
  usunProdukt(produkt: Product) {
    this.przetProduktu.UsunPoNazwie(produkt);
    this.pobierzProdukty();
  }
  usunKlienta(klient: Client) {
    this.przetKlienta.UsunPoNazwie(klient);
    this.pobierzKlientów();
  }

  edytujProduktAkcja(noweDane, produkt: Product) {
    this.komendaEdycjiProduktu.CenaNetto = noweDane.cenaNetto;
    this.komendaEdycjiProduktu.JednostkaMiary = noweDane.jednostkaMiary;
    this.komendaEdycjiProduktu.NowaNazwa = noweDane.nazwa;
    this.komendaEdycjiProduktu.LoginUzytkownika = produkt.LoginUzytkownika;
    this.komendaEdycjiProduktu.Nazwa = produkt.Nazwa;

    this.przetProduktu.Edytuj(this.komendaEdycjiProduktu);
    this.pobierzProdukty();
  }

  edytujKlientaAkcja(noweDane, klient: Client) {
    this.komendaEdycjiKlienta.Nip = noweDane.nip;
    this.komendaEdycjiKlienta.NrKontaBankowego = noweDane.nrBanku;
    this.komendaEdycjiKlienta.Adres = noweDane.adres;
    this.komendaEdycjiKlienta.NazwaFirmy = noweDane.nazwaFirmy;
    this.komendaEdycjiKlienta.LoginUzytkownika = klient.LoginUzytkownika;
    this.komendaEdycjiKlienta.Nazwa = klient.Nazwa;

    this.przetKlienta.Edytuj(this.komendaEdycjiKlienta);
    this.pobierzKlientów();
  }
}

import { Component, OnInit } from '@angular/core';
import {PrzetwarzanieFaktur} from '../pomoce/PrzetwarzanieFaktur';
import {Faktura} from '../modele/Faktura';
import {LogowanieUzytkownika } from '../pomoce/LogowanieUzytkownika';
import {Router} from '@angular/router';
import { Klient } from '../modele/Klient';
import { PrzetwarzanieKlienta } from '../pomoce/PrzetwarzanieKlienta';
import { Uzytkownik } from '../modele/Uzytkownik';
import { Produkt } from '../modele/Produkt';
import { PrzetwarzanieProduktu } from '../pomoce/PrzetwarzanieProduktu';
import { KomendaEdycjiKlienta } from '../komendy/KomendaEdycjiKlienta';
import { KomendaEdycjiProduktu } from '../komendy/KomendaEdycjiProduktu';
import { EdycjaKlientaDialogComponent } from '../oknaDialogowe/EdycjaKlientaDialog.component';
import { EdycjaProduktuDialogComponent } from '../oknaDialogowe/EdycjaProduktuDialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-zdefiniowane-faktury',
  templateUrl: './zdefiniowane-faktury.component.html',
  styleUrls: ['./zdefiniowane-faktury.component.css']
})
export class ZdefiniowaneFakturyComponent implements OnInit {
  faktury:Array<Faktura>;
  klienci:Array<Klient>;
  uzytkownik:Uzytkownik;
  produkty:Array<Produkt>;
  komendaEdycjiKlienta:KomendaEdycjiKlienta;
  komendaEdycjiProduktu:KomendaEdycjiProduktu;
  produktDialog: MatDialogRef<EdycjaProduktuDialogComponent>;
  klientDialog: MatDialogRef<EdycjaKlientaDialogComponent>;

  constructor(public dialog: MatDialog,private przetKlienta:PrzetwarzanieKlienta,private przetProduktu:PrzetwarzanieProduktu, private router:Router,public przetFaktur:PrzetwarzanieFaktur, public logowanieUzyt:LogowanieUzytkownika) { 
    this.uzytkownik = logowanieUzyt.ZalogowanyUzytkownik();
    this.faktury = przetFaktur.PobierzZdefiniowane(this.uzytkownik.Login);
    this.komendaEdycjiProduktu = new KomendaEdycjiProduktu();
    this.komendaEdycjiKlienta = new KomendaEdycjiKlienta();
    this.pobierzKlientów();
    this.pobierzProdukty();
  }

  pobierzKlientów() {
    this.klienci = this.przetKlienta.Pobierz(this.uzytkownik.Login);
  }
  pobierzProdukty(){
    this.produkty = this.przetProduktu.Pobierz(this.uzytkownik.Login);
  }

  wybierzFakture(faktura:Faktura){
    this.przetFaktur.Faktura = faktura;
    this.przetFaktur.Zdefiniowana = true;
    this.router.navigate(["nowa"]);
  }
  ngOnInit() {
  }

  edytujProdukt(produkt:Produkt){
    this.produktDialog = this.dialog.open(EdycjaProduktuDialogComponent, {
      hasBackdrop: false,
      width:"500px",
      data: { nazwa: produkt.Nazwa, cenaNetto: produkt.CenaNetto, jednostkaMiary:produkt.JednostkaMiary }
    });

    this.produktDialog
      .afterClosed()
      .subscribe(rezultat => {
        if(rezultat != "")
          this.edytujProduktAkcja(rezultat,produkt);
      });
  }

  edytujKlienta(klient:Klient){
    this.klientDialog = this.dialog.open(EdycjaKlientaDialogComponent, {
      hasBackdrop: false,
      width:"500px",
      data: { nazwaFirmy: klient.NazwaFirmy, adres: klient.Adres, nrBanku:klient.NrKontaBankowego,nip:klient.Nip }
    });

    this.klientDialog
      .afterClosed()
      .subscribe(rezultat => {
        if(rezultat != "")
          this.edytujKlientaAkcja(rezultat,klient);
      });
  }

  usun(faktura:Faktura){
    this.przetFaktur.UsunPoNazwie(faktura);
    this.faktury = this.przetFaktur.PobierzZdefiniowane(this.logowanieUzyt.ZalogowanyUzytkownik().Login);
  }
  usunProdukt(produkt:Produkt){
    this.przetProduktu.UsunPoNazwie(produkt);
    this.pobierzProdukty();
  }
  usunKlienta(klient:Klient){
    this.przetKlienta.UsunPoNazwie(klient);
    this.pobierzKlientów();
  }

  edytujProduktAkcja(noweDane, produkt:Produkt){

    this.komendaEdycjiProduktu.CenaNetto = noweDane.cenaNetto;
    this.komendaEdycjiProduktu.JednostkaMiary = noweDane.jednostkaMiary;
    this.komendaEdycjiProduktu.NowaNazwa = noweDane.nazwa;
    this.komendaEdycjiProduktu.LoginUzytkownika = produkt.LoginUzytkownika;
    this.komendaEdycjiProduktu.Nazwa = produkt.Nazwa;

    this.przetProduktu.Edytuj(this.komendaEdycjiProduktu);
    this.pobierzProdukty();
  }

  edytujKlientaAkcja(noweDane, klient:Klient){
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

import { Component, OnInit } from '@angular/core';
import { LogowanieUzytkownika } from "../pomoce/LogowanieUzytkownika"
import { KomendaAutoryzacji } from "../komendy/KomendaAutoryzacji"
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { KomendaRejestracji } from "../komendy/KomendaRejestracji"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  haslo;
  pokazRejestracje = false;
  login;
  nowyLogin;
  noweHaslo;
  nrBanku;
  adres;
  nip;
  nazwaFirmy;
  zalogowany;

  constructor(public logowanieUzytkownika: LogowanieUzytkownika, private router: Router,public dialog: MatDialog,public snackBar: MatSnackBar) { }

  zaloguj() {
    var komendaAutoryzacji = new KomendaAutoryzacji(this.login, this.haslo);
    var rezultat = this.logowanieUzytkownika.Zaloguj(komendaAutoryzacji);
    if(rezultat == false){
      this.snackBar.open("Bład logowania!", "", {
        duration: 2000,
      });
    }
  }
  rejestruj() {
    var komendaRejestracji = new KomendaRejestracji(this.nowyLogin, this.noweHaslo, this.nrBanku, this.adres, this.nip, this.nazwaFirmy);
    var rezultat = this.logowanieUzytkownika.Zarejestruj(komendaRejestracji);

    if(rezultat){
      this.snackBar.open("Zarejestrowano!", "", {
        duration: 2000,
      });
    this.pokazRejestracje = false;
    }else{
      this.snackBar.open("Nie udało się!", "", {
        duration: 2000,
      });
    }
  }
  wezZalogowanego() {
    if (this.logowanieUzytkownika.JestZalogowany()) {
      this.zalogowany = this.logowanieUzytkownika.ZalogowanyUzytkownik().Login;
      return true;
    }
    else {
      return false;
    }
  }

  wyloguj() {
    if (this.logowanieUzytkownika.JestZalogowany()) {
      this.router.navigate(['dom'])
      this.logowanieUzytkownika.Wyloguj();
    }
  }

  idzDoProfilu(){
    this.router.navigate(['profil'])
  }
  ngOnInit() {
  }

}

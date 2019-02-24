import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { UserAuthorizer } from "../helpers/user.authorizer";
import { AuthorizeCommand } from "../commands/authorize.command";
import { RegisterCommand } from "../commands/register-command";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
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

  constructor(
    public logowanieUzytkownika: UserAuthorizer,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  zaloguj() {
    var komendaAutoryzacji = new AuthorizeCommand(this.login, this.haslo);
    var rezultat = this.logowanieUzytkownika.Zaloguj(komendaAutoryzacji);
    if (rezultat == false) {
      this.snackBar.open("Bład logowania!", "", {
        duration: 2000
      });
    }
  }
  rejestruj() {
    var komendaRejestracji = new RegisterCommand(
      this.nowyLogin,
      this.noweHaslo,
      this.nrBanku,
      this.adres,
      this.nip,
      this.nazwaFirmy
    );
    var rezultat = this.logowanieUzytkownika.Zarejestruj(komendaRejestracji);

    if (rezultat) {
      this.snackBar.open("Zarejestrowano!", "", {
        duration: 2000
      });
      this.pokazRejestracje = false;
    } else {
      this.snackBar.open("Nie udało się!", "", {
        duration: 2000
      });
    }
  }
  wezZalogowanego() {
    if (this.logowanieUzytkownika.JestZalogowany()) {
      this.zalogowany = this.logowanieUzytkownika.ZalogowanyUzytkownik().Login;
      return true;
    } else {
      return false;
    }
  }

  wyloguj() {
    if (this.logowanieUzytkownika.JestZalogowany()) {
      this.router.navigate(["dom"]);
      this.logowanieUzytkownika.Wyloguj();
    }
  }

  idzDoProfilu() {
    this.router.navigate(["profil"]);
  }
  ngOnInit() {}
}

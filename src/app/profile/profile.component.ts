import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { User } from "../models/user";
import { UserAuthorizer } from "../helpers/user.authorizer";
import { UserEditCommand } from "../commands/user.edit.command";
import { AuthorizeCommand } from "../commands/authorize.command";
import { PasswordEditCommand } from "../commands/password.edit.command";

@Component({
  selector: "app-profil",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  uzytkownik: User;
  nrBanku;
  adres;
  nip;
  nazwaFirmy;
  noweHaslo;
  noweHaslo2;

  constructor(
    public snackBar: MatSnackBar,
    private logowanieUzytkownika: UserAuthorizer
  ) {
    this.uzytkownik = logowanieUzytkownika.getCurrentuser();
    this.nrBanku = this.uzytkownik.AccountNumber;
    this.adres = this.uzytkownik.Address;
    this.nip = this.uzytkownik.TaxId;
    this.nazwaFirmy = this.uzytkownik.CompanyName;
    this.nrBanku = this.uzytkownik.AccountNumber;
    this.nrBanku = this.uzytkownik.AccountNumber;
  }

  edytuj() {
    var komenda = new UserEditCommand(
      this.uzytkownik.Login,
      this.nrBanku,
      this.adres,
      this.nip,
      this.nazwaFirmy
    );
    var result = this.logowanieUzytkownika.Edytuj(komenda);
    if (result == true) {
      this.snackBar.open("Dane zostały zmienione!", "", {
        duration: 2000
      });
      this.logowanieUzytkownika.Zaloguj(
        new AuthorizeCommand(this.uzytkownik.Login, this.uzytkownik.Haslo)
      );
      this.uzytkownik = this.logowanieUzytkownika.getCurrentuser();
    }
  }

  zmienHaslo() {
    if (this.noweHaslo === this.noweHaslo2) {
      var komenda = new PasswordEditCommand(
        this.uzytkownik.Login,
        this.noweHaslo
      );
      var result = this.logowanieUzytkownika.ZmienHaslo(komenda);
      if (result == true) {
        this.snackBar.open("Haslo zostalo zmienione!", "", {
          duration: 2000
        });
        this.logowanieUzytkownika.Zaloguj(
          new AuthorizeCommand(this.uzytkownik.Login, this.uzytkownik.Haslo)
        );
        this.uzytkownik = this.logowanieUzytkownika.getCurrentuser();
      }
    } else {
      this.snackBar.open("Hasla musza byc takie same!", "", {
        duration: 2000
      });
    }
  }

  ngOnInit() {}
}

import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { User } from "../models/user";
import { LocalDB } from "./LocalDB";
import { UserRepository } from "../repositories/user.repository";
import { AuthorizeCommand } from "../commands/authorize.command";
import { RegisterCommand } from "../commands/register-command";
import { UserEditCommand } from "../commands/user.edit.command";
import { PasswordEditCommand } from "../commands/password.edit.command";

@Injectable()
export class UserAuthorizer {
  użytkownik: User;
  constructor(
    public matSnar: MatSnackBar,
    public repoUzytkowników: UserRepository,
    public local: LocalDB
  ) {}
  Zaloguj(komenda: AuthorizeCommand) {
    var użytkownik = this.repoUzytkowników.Pobierz(komenda.Login);
    if (użytkownik == null || użytkownik == undefined) return false;
    if (użytkownik.Haslo == komenda.password) {
      this.local.Authorize(użytkownik.Login);
      this.użytkownik = użytkownik;
    } else {
      return false;
    }
  }
  Wyloguj() {
    this.użytkownik = null;
    this.local.Logout();
  }

  Zarejestruj(komenda: RegisterCommand) {
    if (this.repoUzytkowników.Dodaj(komenda)) return true;
    else return false;
  }

  JestZalogowany() {
    return this.użytkownik != null && this.użytkownik != undefined;
  }

  getCurrentuser(): User {
    return this.użytkownik;
  }

  Edytuj(komenda: UserEditCommand) {
    if (this.repoUzytkowników.Edytuj(komenda)) return true;
    return false;
  }

  ZmienHaslo(komenda: PasswordEditCommand) {
    if (this.repoUzytkowników.ZmienHaslo(komenda)) return true;
    return false;
  }

  // DodajKlientaDlaUzytkownika(komenda:KomendaDodaniaKlientaDlaUzytkownika){
  //     var użytkownik = this.repoUzytkowników.Pobierz(komenda.LoginUzytkownika)

  //     użytkownik.dodajKlienta(new Klient(komenda.Nazwa,komenda.Opis,komenda.NrKontaBankowego,komenda.Adres,komenda.Nip,komenda.NazwaFirmy));

  //     this.repoUzytkowników.Zapisz(użytkownik);
  //     this.użytkownik = użytkownik;
  // }
}

import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { User } from "../models/user";
import { RegisterCommand } from "../commands/register-command";
import { UserEditCommand } from "../commands/user.edit.command";
import { PasswordEditCommand } from "../commands/password.edit.command";

@Injectable()
export class UserRepository {
  constructor(public tmpRepo: LocalDB) {
    var Klienci = new Array<User>();
    this.tmpRepo.Add("Użytkownicy", Klienci);
  }

  Dodaj(komenda: RegisterCommand) {
    var uz = this.Pobierz(komenda.Login);
    if (uz != null) return false;
    var użytkownik = new User(
      komenda.Login,
      komenda.Haslo,
      komenda.NrKontaBankowego,
      komenda.Adres,
      komenda.Nip,
      komenda.NazwaFirmy
    );
    console.log(użytkownik);
    this.tmpRepo.Add(użytkownik.Login, użytkownik);
    return true;
  }

  Pobierz(login: string): User {
    var użytkownik = this.tmpRepo.Get(login);
    return użytkownik;
  }

  Zapisz(użytkownik: User) {
    this.tmpRepo.Add(użytkownik.Login, użytkownik);
  }

  Edytuj(komenda: UserEditCommand) {
    var uzytkownik = this.Pobierz(komenda.Login);
    if (uzytkownik == null) return false;
    uzytkownik.Adres = komenda.Adres;
    uzytkownik.NazwaFirmy = komenda.NazwaFirmy;
    uzytkownik.NrKontaBankowego = komenda.NrKontaBankowego;
    uzytkownik.Nip = komenda.Nip;
    this.tmpRepo.Add(komenda.Login, uzytkownik);
    return true;
  }

  ZmienHaslo(komenda: PasswordEditCommand) {
    var uzytkownik = this.Pobierz(komenda.Login);
    if (uzytkownik == null) return false;
    uzytkownik.Haslo = komenda.NoweHaslo;
    this.tmpRepo.Add(komenda.Login, uzytkownik);
    return true;
  }
}
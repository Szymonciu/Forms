import { Component } from '@angular/core';
import {
  Router
} from '@angular/router';
import { LogowanieUzytkownika } from "./pomoce/LogowanieUzytkownika";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  zalogowany: String;
  constructor(private router: Router, private logowanieUzytkownika: LogowanieUzytkownika) {

  };
  link = "Strona główna"
  title = 'app';
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
    if (this.logowanieUzytkownika.JestZalogowany())
      this.logowanieUzytkownika.Wyloguj();
  }
}

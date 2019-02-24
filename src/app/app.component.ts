import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthorizer } from "./helpers/user.authorizer";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  zalogowany: String;
  constructor(private router: Router, private userAuthorizer: UserAuthorizer) {}
  link = "Strona główna";
  title = "app";
  wezZalogowanego() {
    if (this.userAuthorizer.JestZalogowany()) {
      this.zalogowany = this.userAuthorizer.getCurrentuser().Login;
      return true;
    } else {
      return false;
    }
  }

  wyloguj() {
    if (this.userAuthorizer.JestZalogowany()) this.userAuthorizer.Wyloguj();
  }
}

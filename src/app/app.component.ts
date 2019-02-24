import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthorizer } from "./helpers/user.authorizer";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  loggedUser: String;
  constructor(private router: Router, private userAuthorizer: UserAuthorizer) {}
  link = "Strona główna";
  title = "app";
  getLoggeduser() {
    if (this.userAuthorizer.IsLogged()) {
      this.loggedUser = this.userAuthorizer.GetCurrentUser().Login;
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    if (this.userAuthorizer.IsLogged()) this.userAuthorizer.LogOut();
  }
}

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
  password;
  showRegistration = false;
  login;
  newLogin;
  newPassword;
  accountNumber;
  address;
  taxId;
  companyName;
  loggedIn;

  constructor(
    public userAuthorizer: UserAuthorizer,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  logIn() {
    var authorizeCommand = new AuthorizeCommand(this.login, this.password);
    var result = this.userAuthorizer.LogIn(authorizeCommand);
    if (result == false) {
      this.snackBar.open("Bład logowania!", "", {
        duration: 2000
      });
    }
  }

  register() {
    var registerCommand = new RegisterCommand(
      this.newLogin,
      this.newPassword,
      this.accountNumber,
      this.address,
      this.taxId,
      this.companyName
    );
    var result = this.userAuthorizer.Register(registerCommand);

    if (result) {
      this.snackBar.open("Zarejestrowano!", "", {
        duration: 2000
      });
      this.showRegistration = false;
    } else {
      this.snackBar.open("Nie udało się!", "", {
        duration: 2000
      });
    }
  }

  getLoggedIn() {
    if (this.userAuthorizer.IsLogged()) {
      this.loggedIn = this.userAuthorizer.GetCurrentUser().Login;
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    if (this.userAuthorizer.IsLogged()) {
      this.router.navigate(["dom"]);
      this.userAuthorizer.LogOut();
    }
  }

  goToProfile() {
    this.router.navigate(["profil"]);
  }

  ngOnInit() {}
}

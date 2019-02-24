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
  user: User;
  accountNumber;
  address;
  taxId;
  companyName;
  newPassword;
  newPassword2;

  constructor(
    public snackBar: MatSnackBar,
    private userAuthorizer: UserAuthorizer
  ) {
    this.user = userAuthorizer.GetCurrentUser();
    this.accountNumber = this.user.AccountNumber;
    this.address = this.user.Address;
    this.taxId = this.user.TaxId;
    this.companyName = this.user.CompanyName;
    this.accountNumber = this.user.AccountNumber;
    this.accountNumber = this.user.AccountNumber;
  }

  edit() {
    var userEditCommand = new UserEditCommand(
      this.user.Login,
      this.accountNumber,
      this.address,
      this.taxId,
      this.companyName
    );
    var result = this.userAuthorizer.Edit(userEditCommand);
    if (result == true) {
      this.snackBar.open("Dane zostały zmienione!", "", {
        duration: 2000
      });
      this.userAuthorizer.LogIn(
        new AuthorizeCommand(this.user.Login, this.user.Password)
      );
      this.user = this.userAuthorizer.GetCurrentUser();
    }
  }

  changePassword() {
    if (this.newPassword === this.newPassword2) {
      var command = new PasswordEditCommand(this.user.Login, this.newPassword);
      var result = this.userAuthorizer.ChangePassword(command);
      if (result == true) {
        this.snackBar.open("Haslo zostalo zmienione!", "", {
          duration: 2000
        });
        this.userAuthorizer.LogIn(
          new AuthorizeCommand(this.user.Login, this.user.Password)
        );
        this.user = this.userAuthorizer.GetCurrentUser();
      }
    } else {
      this.snackBar.open("Hasla musza byc takie same!", "", {
        duration: 2000
      });
    }
  }

  ngOnInit() {}
}

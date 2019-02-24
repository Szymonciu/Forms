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
  user: User;
  constructor(
    public matSnar: MatSnackBar,
    public userRepository: UserRepository,
    public local: LocalDB
  ) {}

  LogIn(command: AuthorizeCommand) {
    var user = this.userRepository.Get(command.Login);
    if (user == null || user == undefined) return false;
    if (user.Password == command.password) {
      this.local.Authorize(user.Login);
      this.user = user;
    } else {
      return false;
    }
  }

  LogOut() {
    this.user = null;
    this.local.Logout();
  }

  Register(command: RegisterCommand) {
    if (this.userRepository.Add(command)) return true;
    else return false;
  }

  IsLogged() {
    return this.user != null && this.user != undefined;
  }

  GetCurrentUser(): User {
    return this.user;
  }

  Edit(command: UserEditCommand) {
    if (this.userRepository.Edit(command)) return true;
    return false;
  }

  ChangePassword(command: PasswordEditCommand) {
    if (this.userRepository.ChangePassword(command)) return true;
    return false;
  }
}

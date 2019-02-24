import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { User } from "../models/user";
import { RegisterCommand } from "../commands/register-command";
import { UserEditCommand } from "../commands/user.edit.command";
import { PasswordEditCommand } from "../commands/password.edit.command";

@Injectable()
export class UserRepository {
  constructor(public tmpRepo: LocalDB) {
    var Clients = new Array<User>();
    this.tmpRepo.Add("Users", Clients);
  }

  Add(command: RegisterCommand) {
    var uz = this.Get(command.Login);
    if (uz != null) return false;
    var user = new User(
      command.Login,
      command.Password,
      command.AccountNumber,
      command.Address,
      command.TaxId,
      command.CompanyName
    );
    console.log(user);
    this.tmpRepo.Add(user.Login, user);
    return true;
  }

  Get(login: string): User {
    var user = this.tmpRepo.Get(login);
    return user;
  }

  Save(user: User) {
    this.tmpRepo.Add(user.Login, user);
  }

  Edit(command: UserEditCommand) {
    var user = this.Get(command.Login);
    if (user == null) return false;
    user.Address = command.Address;
    user.CompanyName = command.CompanyName;
    user.AccountNumber = command.AccountNumber;
    user.TaxId = command.TaxId;
    this.tmpRepo.Add(command.Login, user);
    return true;
  }

  ChangePassword(command: PasswordEditCommand) {
    var user = this.Get(command.Login);
    if (user == null) return false;
    user.Password = command.NewPassword;
    this.tmpRepo.Add(command.Login, user);
    return true;
  }
}

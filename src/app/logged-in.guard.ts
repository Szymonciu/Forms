import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { UserAuthorizer } from "./helpers/user.authorizer";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private userAuthorizer: UserAuthorizer) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = this.userAuthorizer.IsLogged();

    return isLogged;
  }
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LogowanieUzytkownika } from './pomoce/LogowanieUzytkownika';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private logowanieUzytkownika: LogowanieUzytkownika) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const jestZalogowany = this.logowanieUzytkownika.JestZalogowany();

    return jestZalogowany;
  }
}
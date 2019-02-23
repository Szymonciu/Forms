import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LogowanieUzytkownika } from './pomoce/LogowanieUzytkownika';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private logowanieUzytkownika: LogowanieUzytkownika) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const jestZalogowany = this.logowanieUzytkownika.JestZalogowany();
    
      return jestZalogowany;
  }
}
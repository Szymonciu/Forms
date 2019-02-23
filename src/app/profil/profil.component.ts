import { Component, OnInit } from '@angular/core';
import{Uzytkownik} from '../modele/Uzytkownik';
import {LogowanieUzytkownika} from '../pomoce/LogowanieUzytkownika';
import { KomendaEdycjiUzytkownika } from '../komendy/KomendaEdycjiUzytkownika';
import { KomendaZmianyHasla } from '../komendy/KomendaZmianyHasla';
import { MatSnackBar } from '@angular/material';
import { KomendaAutoryzacji } from '../komendy/KomendaAutoryzacji';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  uzytkownik:Uzytkownik;
  nrBanku;
  adres;
  nip;
  nazwaFirmy;
  noweHaslo;
  noweHaslo2;

  constructor(public snackBar: MatSnackBar,private logowanieUzytkownika:LogowanieUzytkownika) {
    this.uzytkownik = logowanieUzytkownika.ZalogowanyUzytkownik();
    this.nrBanku = this.uzytkownik.NrKontaBankowego;
    this.adres = this.uzytkownik.Adres;
    this.nip = this.uzytkownik.Nip;
    this.nazwaFirmy = this.uzytkownik.NazwaFirmy;
    this.nrBanku = this.uzytkownik.NrKontaBankowego;
    this.nrBanku = this.uzytkownik.NrKontaBankowego;
   }

   edytuj(){
    var komenda = new KomendaEdycjiUzytkownika(this.uzytkownik.Login,this.nrBanku,this.adres,this.nip,this.nazwaFirmy);
    var result = this.logowanieUzytkownika.Edytuj(komenda);
    if(result == true){
      this.snackBar.open("Dane zostały zmienione!", "", {
        duration: 2000,
      });
      this.logowanieUzytkownika.Zaloguj(new KomendaAutoryzacji(this.uzytkownik.Login, this.uzytkownik.Haslo));
      this.uzytkownik = this.logowanieUzytkownika.ZalogowanyUzytkownik();
    }
   }

   zmienHaslo(){
     if(this.noweHaslo === this.noweHaslo2){
      var komenda = new KomendaZmianyHasla(this.uzytkownik.Login,this.noweHaslo);
      var result = this.logowanieUzytkownika.ZmienHaslo(komenda);
      if(result == true){
        this.snackBar.open("Haslo zostalo zmienione!", "", {
          duration: 2000,
        });
        this.logowanieUzytkownika.Zaloguj(new KomendaAutoryzacji(this.uzytkownik.Login, this.uzytkownik.Haslo));
        this.uzytkownik = this.logowanieUzytkownika.ZalogowanyUzytkownik();
      }
    }
    else{
      this.snackBar.open("Hasla musza byc takie same!", "", {
        duration: 2000,
      });
    }
   }

  ngOnInit() {
  }

}

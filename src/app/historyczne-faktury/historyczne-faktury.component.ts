import { Component, OnInit } from '@angular/core';
import {PrzetwarzanieFaktur} from '../pomoce/PrzetwarzanieFaktur';
import {Faktura} from '../modele/Faktura';
import { LogowanieUzytkownika } from '../pomoce/LogowanieUzytkownika';
import {Router} from '@angular/router';

@Component({
  selector: 'app-historyczne-faktury',
  templateUrl: './historyczne-faktury.component.html',
  styleUrls: ['./historyczne-faktury.component.css']
})
export class HistoryczneFakturyComponent implements OnInit {
  faktury:Array<Faktura>
  constructor(private router:Router,public przetFaktur:PrzetwarzanieFaktur, public logowanieUzyt:LogowanieUzytkownika) { 
    this.faktury = przetFaktur.Pobierz(logowanieUzyt.ZalogowanyUzytkownik().Login);
  }

  wybierzFakture(faktura:Faktura){
    this.przetFaktur.Faktura = faktura;
    this.przetFaktur.WyliczDlaFaktury();
    this.router.navigate(["faktura"]);
  }
  ngOnInit() {
  }

  usun(faktura:Faktura){
    this.przetFaktur.Usun(faktura);
    this.faktury = this.przetFaktur.Pobierz(this.logowanieUzyt.ZalogowanyUzytkownik().Login);
  }

}

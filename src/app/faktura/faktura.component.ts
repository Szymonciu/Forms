import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Faktura } from '../modele/Faktura';
import {PrzetwarzanieFaktur} from '../pomoce/PrzetwarzanieFaktur';
import { Router } from '@angular/router';


@Component({
  selector: 'app-faktura',
  templateUrl: './faktura.component.html',
  styleUrls: ['./faktura.component.css']
})
export class FakturaComponent implements OnInit {
 faktura:Faktura
 vat;
 vatCaly;
 podsumowanie;
  constructor(private router:Router,private przetFaktury: PrzetwarzanieFaktur) {
    
   }

  ngOnInit() {
    this.faktura = this.przetFaktury.Faktura;
    this.vat = this.przetFaktury.Procent;
    this.vatCaly = this.przetFaktury.ProcentCaly;
    this.podsumowanie = this.przetFaktury.FakturaPodsumowanie;
  }
   print() {
    var printContents = document.getElementById("FakturaPrint").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

back1(){
  this.router.navigate(['dom'])
}

}

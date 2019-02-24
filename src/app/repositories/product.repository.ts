import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { Product } from "../models/product";
import { ProductAddCommand } from "../commands/product.add.command";
import { ProductEditCommand } from "../commands/product.edit.command";

@Injectable()
export class ProductRepository {
  prfix = "Produkty";
  constructor(public tmpRepo: LocalDB) {
    if (tmpRepo.Get(this.prfix) == null) {
      var Produkty = new Array<Product>();
      this.tmpRepo.Add(this.prfix, Produkty);
    }
  }

  Dodaj(komenda: ProductAddCommand): boolean {
    var produkt = this.Pobierz(komenda.Name);
    if (produkt !== null) return false;

    produkt = new Product(komenda.Name);
    produkt.Quantity = komenda.Quantity;
    produkt.NettoPrice = komenda.NettoPrice;
    produkt.Unit = komenda.Unit;
    produkt.Login = komenda.Login;

    var produkty = this.tmpRepo.Get(this.prfix);
    produkty.push(produkt);

    this.tmpRepo.Add(this.prfix, produkty);
    return true;
  }

  Pobierz(nazwa: string): Product {
    var produkty = this.tmpRepo.Get(this.prfix);
    if (produkty.length > 0) {
      for (let i = 0; i < produkty.length; i++) {
        if (produkty[i].Nazwa == nazwa) {
          return produkty[i];
        }
      }
    }
    return null;
  }

  PobierzDlaUzytkownika(login: string): Array<Product> {
    var produktyDlaUzytkownika = new Array<Product>();
    var produkty = this.tmpRepo.Get(this.prfix);
    if (produkty.length > 0) {
      for (let i = 0; i < produkty.length; i++) {
        if (produkty[i].LoginUzytkownika == login) {
          produktyDlaUzytkownika.push(produkty[i]);
        }
      }
    }
    return produktyDlaUzytkownika;
  }

  PobierzWszystkie(): Array<Product> {
    var produkty = this.tmpRepo.Get(this.prfix);
    return produkty;
  }

  UsunPoNazwie(produkt: Product) {
    var indexOf;
    var produkty = this.PobierzWszystkie();
    for (let i = 0; i < produkty.length; i++) {
      if (
        produkty[i].Name == produkt.Name &&
        produkty[i].Login == produkt.Login
      )
        indexOf = i;
    }
    produkty.splice(indexOf, 1);
    this.tmpRepo.Add(this.prfix, produkty);
    return true;
  }

  Edytuj(komenda: ProductEditCommand) {
    var produkty = this.PobierzWszystkie();
    var produkt: Product;

    for (let i = 0; i < produkty.length; i++) {
      if (
        produkty[i].Name == komenda.Name &&
        produkty[i].Login == komenda.Login
      )
        produkt = produkty[i];
    }

    produkt.Name = komenda.NewName;
    produkt.Unit = komenda.Unit;
    produkt.NettoPrice = komenda.NettoPrice;

    this.tmpRepo.Add(this.prfix, produkty);
    return true;
  }
}

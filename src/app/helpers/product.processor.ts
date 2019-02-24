import { Injectable } from "@angular/core";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { ProductAddCommand } from "../commands/product.add.command";
import { ProductEditCommand } from "../commands/product.edit.command";

@Injectable()
export class ProductProcessor {
  constructor(public repoProduktów: ProductRepository) {}

  Get(login: string): Array<Product> {
    return this.repoProduktów.PobierzDlaUzytkownika(login);
  }

  Dodaj(komenda: ProductAddCommand): boolean {
    var result = this.repoProduktów.Dodaj(komenda);
    if (result) {
      return true;
    }
    return false;
  }

  DeleteByName(produkt: Product) {
    var result = this.repoProduktów.UsunPoNazwie(produkt);
    if (result) {
      return true;
    }
    return false;
  }

  Edit(komenda: ProductEditCommand) {
    var result = this.repoProduktów.Edytuj(komenda);
    if (result) {
      return true;
    }
    return false;
  }
}

import { Injectable } from "@angular/core";
import { LocalDB } from "../helpers/LocalDB";
import { Product } from "../models/product";
import { ProductAddCommand } from "../commands/product.add.command";
import { ProductEditCommand } from "../commands/product.edit.command";

@Injectable()
export class ProductRepository {
  prfix = "Products";
  constructor(public tmpRepo: LocalDB) {
    if (tmpRepo.Get(this.prfix) == null) {
      var products = new Array<Product>();
      this.tmpRepo.Add(this.prfix, products);
    }
  }

  Add(command: ProductAddCommand): boolean {
    var produkt = this.Get(command.Name);
    if (produkt !== null) return false;

    produkt = new Product(command.Name);
    produkt.Quantity = command.Quantity;
    produkt.NettoPrice = command.NettoPrice;
    produkt.Unit = command.Unit;
    produkt.Login = command.Login;

    var products = this.tmpRepo.Get(this.prfix);
    products.push(produkt);

    this.tmpRepo.Add(this.prfix, products);
    return true;
  }

  Get(name: string): Product {
    var products = this.tmpRepo.Get(this.prfix);
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].Name == name) {
          return products[i];
        }
      }
    }
    return null;
  }

  GetForUser(login: string): Array<Product> {
    var productsForUser = new Array<Product>();
    var products = this.tmpRepo.Get(this.prfix);
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].Login == login) {
          productsForUser.push(products[i]);
        }
      }
    }
    return productsForUser;
  }

  GetAll(): Array<Product> {
    var products = this.tmpRepo.Get(this.prfix);
    return products;
  }

  DeleteByName(product: Product) {
    var indexOf;
    var products = this.GetAll();
    for (let i = 0; i < products.length; i++) {
      if (
        products[i].Name == product.Name &&
        products[i].Login == product.Login
      )
        indexOf = i;
    }
    products.splice(indexOf, 1);
    this.tmpRepo.Add(this.prfix, products);
    return true;
  }

  Edit(command: ProductEditCommand) {
    var products = this.GetAll();
    var product: Product;

    for (let i = 0; i < products.length; i++) {
      if (
        products[i].Name == command.Name &&
        products[i].Login == command.Login
      )
        product = products[i];
    }

    product.Name = command.NewName;
    product.Unit = command.Unit;
    product.NettoPrice = command.NettoPrice;

    this.tmpRepo.Add(this.prfix, products);
    return true;
  }
}

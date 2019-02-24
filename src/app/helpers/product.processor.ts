import { Injectable } from "@angular/core";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { ProductAddCommand } from "../commands/product.add.command";
import { ProductEditCommand } from "../commands/product.edit.command";

@Injectable()
export class ProductProcessor {
  constructor(public productRepository: ProductRepository) {}

  Get(login: string): Array<Product> {
    return this.productRepository.GetForUser(login);
  }

  Add(command: ProductAddCommand): boolean {
    var result = this.productRepository.Add(command);
    if (result) {
      return true;
    }
    return false;
  }

  DeleteByName(product: Product) {
    var result = this.productRepository.DeleteByName(product);
    if (result) {
      return true;
    }
    return false;
  }

  Edit(command: ProductEditCommand) {
    var result = this.productRepository.Edit(command);
    if (result) {
      return true;
    }
    return false;
  }
}

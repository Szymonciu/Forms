import { Injectable } from "@angular/core";

@Injectable()
export class LocalDB {
  private prefix = "Invoicing.";
  Add(name: string, object: object) {
    let prefixedName = this.prefix + name;
    localStorage.setItem(prefixedName, JSON.stringify(object));
  }
  Remove(name: string) {
    let prefixedName = this.prefix + name;
    localStorage.removeItem(prefixedName);
  }
  Get(name: string) {
    let prefixedName = this.prefix + name;
    var item = localStorage.getItem(prefixedName);
    return JSON.parse(item);
  }
  Authorize(userName: string) {
    localStorage.removeItem("Authorize");
    localStorage.setItem("Authorize", userName);
  }
  Logout() {
    localStorage.removeItem("Authorize");
  }
}

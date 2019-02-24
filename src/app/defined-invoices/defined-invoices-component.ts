import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { ClientEditCommand } from "../commands/client.edit.command";
import { ProductEditCommand } from "../commands/product.edit.command";
import { ClientEditDialog } from "../dialogs/client.edit.dialog";
import { ProductEditDialog } from "../dialogs/product.edit.dialog";
import { ClientProcessor } from "../helpers/client.processor";
import { InvoiceProcessor } from "../helpers/invoice.processor";
import { ProductProcessor } from "../helpers/product.processor";
import { UserAuthorizer } from "../helpers/user.authorizer";
import { Client } from "../models/client";
import { Invoice } from "../models/invoice";
import { Product } from "../models/product";
import { User } from "../models/user";

@Component({
  selector: "app-zdefiniowane-faktury",
  templateUrl: "./defined-invoices-component.html",
  styleUrls: ["./defined-invoices-component.css"]
})
export class DefinedInvoicesComponent implements OnInit {
  invoices: Array<Invoice>;
  clients: Array<Client>;
  user: User;
  products: Array<Product>;
  clientEditCommand: ClientEditCommand;
  productEditCommand: ProductEditCommand;
  productEditDialog: MatDialogRef<ProductEditDialog>;
  clientEditDialog: MatDialogRef<ClientEditDialog>;

  constructor(
    public dialog: MatDialog,
    private clientProcessor: ClientProcessor,
    private productProcessor: ProductProcessor,
    private router: Router,
    public invoiceProcessor: InvoiceProcessor,
    public userAuthorizer: UserAuthorizer
  ) {
    this.user = userAuthorizer.getCurrentuser();
    this.invoices = invoiceProcessor.getDefined(this.user.Login);
    this.productEditCommand = new ProductEditCommand();
    this.clientEditCommand = new ClientEditCommand();
    this.getClients();
    this.getProducts();
  }

  getClients() {
    this.clients = this.clientProcessor.Get(this.user.Login);
  }
  getProducts() {
    this.products = this.productProcessor.Get(this.user.Login);
  }

  chooseinvoice(invoice: Invoice) {
    this.invoiceProcessor.Invoice = invoice;
    this.invoiceProcessor.Defined = true;
    this.router.navigate(["nowa"]);
  }
  ngOnInit() {}

  editProductAction(product: Product) {
    this.productEditDialog = this.dialog.open(ProductEditDialog, {
      hasBackdrop: false,
      width: "500px",
      data: {
        name: product.Name,
        nettoPrice: product.NettoPrice,
        unit: product.Unit
      }
    });

    this.productEditDialog.afterClosed().subscribe(result => {
      if (result != "") this.editProduct(result, product);
    });
  }

  edytujKlienta(client: Client) {
    this.clientEditDialog = this.dialog.open(ClientEditDialog, {
      hasBackdrop: false,
      width: "500px",
      data: {
        companyName: client.CompanyName,
        address: client.Address,
        accountNumber: client.AccountNumber,
        taxId: client.TaxId
      }
    });

    this.clientEditDialog.afterClosed().subscribe(result => {
      if (result != "") this.editClient(result, client);
    });
  }

  delete(invoice: Invoice) {
    this.invoiceProcessor.DeleteByName(invoice);
    this.invoices = this.invoiceProcessor.getDefined(
      this.userAuthorizer.getCurrentuser().Login
    );
  }

  deleteProduct(product: Product) {
    this.productProcessor.DeleteByName(product);
    this.getProducts();
  }

  deleteClient(client: Client) {
    this.clientProcessor.DeleteByName(client);
    this.getClients();
  }

  editProduct(newData, produkt: Product) {
    this.productEditCommand.NettoPrice = newData.nettoPrice;
    this.productEditCommand.Unit = newData.unit;
    this.productEditCommand.NewName = newData.name;
    this.productEditCommand.Login = produkt.Login;
    this.productEditCommand.Name = produkt.Name;

    this.productProcessor.Edit(this.productEditCommand);
    this.getProducts();
  }

  editClient(newData, client: Client) {
    this.clientEditCommand.TaxId = newData.taxId;
    this.clientEditCommand.AccountNumber = newData.accountNumber;
    this.clientEditCommand.Address = newData.address;
    this.clientEditCommand.CompanyName = newData.companyName;
    this.clientEditCommand.Login = client.Login;
    this.clientEditCommand.Name = client.Name;

    this.clientProcessor.Edit(this.clientEditCommand);
    this.getClients();
  }
}

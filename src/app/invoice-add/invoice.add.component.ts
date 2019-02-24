import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { FormControl } from "@angular/forms";
import { filter } from "rxjs/operators";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OnChanges } from "@angular/core";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from "rxjs";
import { Invoice } from "../models/invoice";
import { User } from "../models/user";
import { Client } from "../models/client";
import { Product } from "../models/product";
import { DefinedInvoiceDialog } from "../dialogs/defined.invoice.dialog";
import { ClientAddCommand } from "../commands/client.add.command";
import { InvoiceAddCommand } from "../commands/invoice.add.command";
import { ProductAddCommand } from "../commands/product.add.command";
import { InvoiceProcessor } from "../helpers/invoice.processor";
import { ClientProcessor } from "../helpers/client.processor";
import { UserAuthorizer } from "../helpers/user.authorizer";
import { ProductProcessor } from "../helpers/product.processor";

@Component({
  selector: "app-nowa-faktura",
  templateUrl: "./invoice.add.component.html",
  styleUrls: ["./invoice.add.component.css"]
})
export class InvoiceAddComponent implements OnInit {
  vat = 23;
  noClients;
  noProducts;
  error = false;
  definedInvoiceDialog: MatDialogRef<DefinedInvoiceDialog>;
  invoice: Invoice;
  vatPercent = 0.23;
  vatPercentOverall = 1.23;
  defined = false;
  invoiceNumber: string;
  user: User;
  clients: Array<Client>;
  products: Array<Product>;
  choosedProducts: Array<Product>;
  choosedClient = {
    TaxId: null,
    Address: null,
    CompanyName: null,
    Name: null
  };
  summary = {
    Vat: null,
    Brutto: null,
    Netto: null
  };
  showClientForm = false;
  addClientSuccessful = false;
  addProductSuccessful = false;
  showInvoice = false;
  isError = false;
  clientAddCommand: ClientAddCommand;
  invoiceAddCommand: InvoiceAddCommand;
  productAddCommand: ProductAddCommand;
  toppings: FormControl = new FormControl();
  filteredOptions: Observable<Array<Client>>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private invoiceProcessor: InvoiceProcessor,
    private clientProcessor: ClientProcessor,
    private userAuthorizer: UserAuthorizer,
    private productProcessor: ProductProcessor
  ) {
    this.clientAddCommand = new ClientAddCommand();
    this.invoiceAddCommand = new InvoiceAddCommand();
    var now = new Date();
    this.invoiceAddCommand.PaymentDate = now;
    this.invoiceAddCommand.CreatedDate = now;
    this.productAddCommand = new ProductAddCommand();
    this.choosedProducts = new Array<Product>();
    this.user = userAuthorizer.GetCurrentUser();
    this.getClients();
    this.getProducts();
    this.invoiceNumber = this.invoiceProcessor.GenerateInvoiceNumber(
      this.user.Login
    );
    this.isDefined();
  }

  getClients() {
    this.clients = this.clientProcessor.Get(this.user.Login);
  }
  isDefined() {
    if (this.invoiceProcessor.Defined) {
      var invoiceSaved = this.invoiceProcessor.Invoice;
      this.chooseClient(invoiceSaved.Client);
      this.invoiceAddCommand.PaymentType = invoiceSaved.PaymentType;
      this.invoiceAddCommand.Vat = invoiceSaved.Vat;
      this.vat = invoiceSaved.Vat;
      for (let i = 0; i < invoiceSaved.Products.length; i++) {
        this.choosedProducts.push(invoiceSaved.Products[i]);
      }

      this.calculateSummary();
      this.invoiceAddCommand.Products = this.choosedProducts;
    }
    this.invoiceProcessor.Defined = false;
  }

  openDialog() {
    if (this.check()) {
      this.snackBar.open("Uzupełnij wymagane pola!", "", {
        duration: 2000
      });
      return;
    }
    this.definedInvoiceDialog = this.dialog.open(DefinedInvoiceDialog, {
      hasBackdrop: false
    });

    this.definedInvoiceDialog
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        this.invoiceAddCommand.Name = name;
        this.define();
      });
  }

  addClient() {
    this.clientAddCommand.Login = this.user.Login;
    var result = this.clientProcessor.Add(this.clientAddCommand);

    if (result) {
      this.clientAddCommand = new ClientAddCommand();
      this.addClientSuccessful = true;
      this.snackBar.open("Dodano nowego klienta!", "", {
        duration: 2000
      });
      this.getClients();
    } else {
      this.snackBar.open("Nie udało się!", "", {
        duration: 2000
      });
    }
  }

  setVat(value) {
    this.vatPercent = value / 100;
    this.vatPercentOverall = 1 + this.vatPercent;
    this.invoiceProcessor.Percent = this.vatPercent;
    this.invoiceProcessor.PercentOverall = this.vatPercentOverall;
  }

  getProducts() {
    this.products = this.productProcessor.Get(this.user.Login);
    console.log(this.products);
  }

  addProduct() {
    this.productAddCommand.Login = this.user.Login;
    var result = this.productProcessor.Add(this.productAddCommand);

    if (result) {
      this.productAddCommand = new ProductAddCommand();
      this.addProductSuccessful = true;
      this.getProducts();
      this.snackBar.open("Dodano nowy produkt!", "", {
        duration: 2000
      });
    } else {
      this.snackBar.open("Nie udało się!", "", {
        duration: 2000
      });
    }
  }

  calculateSummary() {
    this.summary.Vat = 0;
    this.summary.Netto = 0;
    this.summary.Brutto = 0;
    for (let i = 0; i < this.choosedProducts.length; i++) {
      this.summary.Vat =
        this.summary.Vat +
        this.choosedProducts[i].NettoPrice *
          this.choosedProducts[i].Quantity *
          this.vatPercent;
      this.summary.Netto =
        this.summary.Netto +
        this.choosedProducts[i].NettoPrice * this.choosedProducts[i].Quantity;
      this.summary.Brutto =
        this.summary.Brutto +
        this.choosedProducts[i].NettoPrice *
          this.choosedProducts[i].Quantity *
          this.vatPercentOverall;
    }
    this.summary.Vat = this.precisionRound(this.summary.Vat, 2);
    this.summary.Netto = this.precisionRound(this.summary.Netto, 2);
    this.summary.Brutto = this.precisionRound(this.summary.Brutto, 2);

    this.invoiceProcessor.InvoiceSummary = this.summary;
  }

  chooseClient(client: Client) {
    this.choosedClient = client;
    this.invoiceAddCommand.ClientLogin = client.Name;
  }

  chooseProducts(product: Product) {
    if (this.choosedProducts.includes(product)) this.deleteProduct(product);
    else {
      product.Quantity = 1;
      this.choosedProducts.push(product);
    }
    this.calculateSummary();
    this.invoiceAddCommand.Products = this.choosedProducts;
  }

  deleteProduct(produkt: Product) {
    var index = this.choosedProducts.indexOf(produkt, 0);
    if (index > -1) {
      this.choosedProducts.splice(index, 1);
    }
  }

  sendInvoice() {
    if (this.check()) {
      this.snackBar.open("Uzupełnij wymagane pola!", "", {
        duration: 2000
      });
      return;
    }
    if (this.defined != true) {
      this.invoice = this.newInvoice(false);
      this.router.navigate(["faktura"]);
    } else {
      this.router.navigate(["faktura"]);
    }
  }

  define() {
    if (this.check()) {
      this.snackBar.open("Uzupełnij wymagane pola!", "", {
        duration: 2000
      });
      return;
    }

    this.invoice = this.newInvoice(true);
    this.defined = true;
    this.snackBar.open("Zapisano fakture!", "", {
      duration: 2000
    });
  }

  check() {
    if (
      this.invoiceAddCommand.ClientLogin === null ||
      this.invoiceAddCommand.ClientLogin === undefined ||
      this.invoiceAddCommand.ClientLogin == ""
    )
      return true;
    if (
      this.invoiceAddCommand.CreatedDate === null ||
      this.invoiceAddCommand.CreatedDate === undefined ||
      this.invoiceAddCommand.PaymentDate == null ||
      this.invoiceAddCommand.PaymentDate == undefined
    )
      return true;
    if (
      this.invoiceAddCommand.Products === null ||
      this.invoiceAddCommand.Products === undefined ||
      this.invoiceAddCommand.Products.length <= 0
    )
      return true;
  }

  newInvoice(defined) {
    this.invoiceAddCommand.Login = this.user.Login;
    this.invoiceAddCommand.InvoiceNumber = this.invoiceNumber;
    this.invoiceAddCommand.Vat = this.vat;
    if (defined) {
      this.invoiceAddCommand.Defined = true;
    }

    this.invoiceProcessor.Add(this.invoiceAddCommand);

    return this.invoiceProcessor.GetByNumber(
      this.invoiceNumber,
      this.user.Login
    );
  }

  calculate() {
    this.calculateSummary();
  }

  ngOnInit() {}

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  appendClient() {
    if (this.clients.length <= 0) this.noClients = true;
    else this.noClients = false;
  }

  appendProduct() {
    if (this.products.length <= 0) this.noProducts = true;
    else this.noProducts = false;
  }
}

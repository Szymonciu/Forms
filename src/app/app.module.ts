import { BrowserModule } from "@angular/platform-browser";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import "hammerjs";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { LoggedInGuard } from "./logged-in.guard";
import { MatDialogModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { InvoiceAddComponent } from "./invoice-add/invoice.add.component";
import { DefinedInvoicesComponent } from "./defined-invoices/defined-invoices-component";
import { HistoricInvoicesComponent } from "./historic-invoices/historic.invoices.component";
import { DefinedInvoiceDialog } from "./dialogs/defined.invoice.dialog";
import { ClientEditDialog } from "./dialogs/client.edit.dialog";
import { ProductEditDialog } from "./dialogs/product.edit.dialog";
import { LocalDB } from "./helpers/LocalDB";
import { UserRepository } from "./repositories/user.repository";
import { ClientRepository } from "./repositories/client.repository";
import { InvoiceRepository } from "./repositories/invoice.repository";
import { ClientProcessor } from "./helpers/client.processor";
import { InvoiceProcessor } from "./helpers/invoice.processor";
import { ProductRepository } from "./repositories/product.repository";
import { ProductProcessor } from "./helpers/product.processor";
import { UserAuthorizer } from "./helpers/user.authorizer";

const ścieżki: Routes = [
  // basic routes
  { path: "", redirectTo: "dom", pathMatch: "full" },
  { path: "dom", component: HomeComponent },
  { path: "profil", component: ProfileComponent, canActivate: [LoggedInGuard] },
  {
    path: "faktura",
    component: InvoiceComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "nowa",
    component: InvoiceAddComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "zdefiniowana",
    component: DefinedInvoicesComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "historyczne",
    component: HistoricInvoicesComponent,
    canActivate: [LoggedInGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    LoginComponent,
    HistoricInvoicesComponent,
    DefinedInvoicesComponent,
    InvoiceAddComponent,
    HomeComponent,
    DefinedInvoiceDialog,
    ProfileComponent,
    ClientEditDialog,
    ProductEditDialog
  ],
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ścieżki)
  ],
  entryComponents: [ProductEditDialog, DefinedInvoiceDialog, ClientEditDialog],
  providers: [
    LocalDB,
    UserRepository,
    ClientRepository,
    InvoiceRepository,
    ClientProcessor,
    InvoiceProcessor,
    ProductRepository,
    ProductProcessor,
    UserAuthorizer,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

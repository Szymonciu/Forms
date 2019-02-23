import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LocalDB } from './pomoce/LocalDB';
import 'hammerjs';
import { RepozytoriumUzytkowników } from './repozytoria/RepozytoriumUzytkowników';
import { RepozutoriumKlientów } from './repozytoria/RepozutoriumKlientów';
import { RepozytoriumProduktów } from './repozytoria/RepozytoriumProduktów';
import { RepozytoriumFaktur } from './repozytoria/RepozytoriumFaktur';
import { LogowanieUzytkownika } from './pomoce/LogowanieUzytkownika';
import { PrzetwarzanieProduktu } from './pomoce/PrzetwarzanieProduktu';
import { PrzetwarzanieKlienta } from './pomoce/PrzetwarzanieKlienta';
import { PrzetwarzanieFaktur } from './pomoce/PrzetwarzanieFaktur';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FakturaComponent } from './faktura/faktura.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { HistoryczneFakturyComponent } from './historyczne-faktury/historyczne-faktury.component';
import { ZdefiniowaneFakturyComponent } from './zdefiniowane-faktury/zdefiniowane-faktury.component';
import { NowaFakturaComponent } from './nowa-faktura/nowa-faktura.component';
import { DomowyComponent } from './domowy/domowy.component';
import { ZdefinowanaDialogComponent } from './oknaDialogowe/ZdefinowanaDialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  MatTooltipModule,
} from '@angular/material';
import { ProfilComponent } from './profil/profil.component';
import { EdycjaKlientaDialogComponent } from './oknaDialogowe/EdycjaKlientaDialog.component';
import { EdycjaProduktuDialogComponent } from './oknaDialogowe/EdycjaProduktuDialog.component';

const ścieżki: Routes = [
  // basic routes
  { path: '', redirectTo: 'dom', pathMatch: 'full' },
  { path: 'dom', component: DomowyComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [LoggedInGuard] },
  { path: 'faktura', component: FakturaComponent, canActivate: [LoggedInGuard] },
  { path: 'nowa', component: NowaFakturaComponent, canActivate: [LoggedInGuard] },
  { path: 'zdefiniowana', component: ZdefiniowaneFakturyComponent, canActivate: [LoggedInGuard] },
  {
    path: 'historyczne',
    component: HistoryczneFakturyComponent,
    canActivate: [LoggedInGuard]
  },
];
@NgModule({
  declarations: [
    AppComponent,
    FakturaComponent,
    LoginComponent,
    HistoryczneFakturyComponent,
    ZdefiniowaneFakturyComponent,
    NowaFakturaComponent,
    DomowyComponent,
    ZdefinowanaDialogComponent,
    ProfilComponent,
    EdycjaKlientaDialogComponent,
    EdycjaProduktuDialogComponent
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
  entryComponents: [EdycjaProduktuDialogComponent,ZdefinowanaDialogComponent, EdycjaKlientaDialogComponent],
  providers: [LocalDB, RepozytoriumUzytkowników, RepozutoriumKlientów, RepozytoriumFaktur, PrzetwarzanieKlienta, PrzetwarzanieFaktur, RepozytoriumProduktów, PrzetwarzanieProduktu, LogowanieUzytkownika, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

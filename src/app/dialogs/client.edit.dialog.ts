import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="form" (ngSubmit)="submit(form)">
  <h1 mat-dialog-title>Edytuj</h1>
  <mat-dialog-content>
    <mat-form-field>
      <input matInput formControlName="nazwaFirmy" placeholder="Nazwa firmy">
    </mat-form-field>
    <br>
    <mat-form-field>
      <input matInput formControlName="nrBanku" placeholder="Nr konta Bankowego">
    </mat-form-field>
    <br>
    <mat-form-field>
      <input matInput formControlName="adres" placeholder="Adres">
    </mat-form-field>
    <br>
    <mat-form-field>
      <input matInput formControlName="nip" placeholder="Nip">
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button type="submit">Edytuj</button>
    <button mat-button type="button" mat-dialog-close>Anuluj</button>
  </mat-dialog-actions>
</form>
  `
})
export class ClientEditDialog implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClientEditDialog>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nazwaFirmy: this.data.nazwaFirmy, adres: this.data.adres, nrBanku: this.data.nrBankuo, nip: this.data.nip
    })
  }

  submit(form) {
    var rezult = {
      nrBanku: form.value.nrBanku,
      nazwaFirmy: form.value.nazwaFirmy,
      adres: form.value.adres,
      nip: form.value.nip
    }
    this.dialogRef.close(rezult);
  }
}
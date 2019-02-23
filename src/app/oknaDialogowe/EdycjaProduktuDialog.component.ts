import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="form" (ngSubmit)="submit(form)">
  <h1 mat-dialog-title>Add file</h1>
  <mat-dialog-content>
    <mat-form-field>
      <input matInput formControlName="nazwa" placeholder="Nazwa">
    </mat-form-field>
    <br>
    <mat-form-field>
    <input matInput formControlName="cenaNetto" placeholder="Cena netto">
  </mat-form-field>
  <br>
  <mat-form-field>
  <input matInput formControlName="jednostkaMiary" placeholder="Jednostka miary">
</mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button type="submit">Add</button>
    <button mat-button type="button" mat-dialog-close>Cancel</button>
  </mat-dialog-actions>
</form>
  `
})
export class EdycjaProduktuDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EdycjaProduktuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        nazwa:this.data.nazwa,
        cenaNetto:this.data.cenaNetto,
        jednostkaMiary:this.data.jednostkaMiary
      });
  }

  submit(form) {
    var rezult = {
        nazwa:form.value.nazwa,
        cenaNetto:form.value.cenaNetto,
        jednostkaMiary:form.value.jednostkaMiary
    }
    this.dialogRef.close(rezult);
  }
}
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="form" (ngSubmit)="submit(form)">
  <h1 mat-dialog-title>Podaj nazwe dla faktury</h1>
  <mat-dialog-content>
    <mat-form-field>
      <input matInput formControlName="filename" placeholder="Nazwa">
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button type="submit">Zapisz</button>
    <button mat-button type="button" mat-dialog-close>Anuluj</button>
  </mat-dialog-actions>
</form>
  `
})
export class ZdefinowanaDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ZdefinowanaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        filename: ''
      })
  }

  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }
}
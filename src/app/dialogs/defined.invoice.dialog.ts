import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  templateUrl: "defined.invoice.dialog.html"
})
export class DefinedInvoiceDialog implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DefinedInvoiceDialog>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      filename: ""
    });
  }

  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }
}

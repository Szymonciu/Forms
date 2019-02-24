import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  templateUrl: "client.edit.dialog.html"
})
export class ClientEditDialog implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClientEditDialog>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      companyName: this.data.companyName,
      address: this.data.address,
      accountNumber: this.data.accountNumber,
      taxId: this.data.taxId
    });
  }

  submit(form) {
    var rezult = {
      accountNumber: form.value.accountNumber,
      companyName: form.value.companyName,
      address: form.value.address,
      taxId: form.value.taxId
    };
    this.dialogRef.close(rezult);
  }
}

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
      nazwaFirmy: this.data.nazwaFirmy,
      adres: this.data.adres,
      nrBanku: this.data.nrBankuo,
      nip: this.data.nip
    });
  }

  submit(form) {
    var rezult = {
      nrBanku: form.value.nrBanku,
      nazwaFirmy: form.value.nazwaFirmy,
      adres: form.value.adres,
      nip: form.value.nip
    };
    this.dialogRef.close(rezult);
  }
}

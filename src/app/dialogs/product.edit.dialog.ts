import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  templateUrl: "product.edit.dialog.html"
})
export class ProductEditDialog implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nazwa: this.data.nazwa,
      cenaNetto: this.data.cenaNetto,
      jednostkaMiary: this.data.jednostkaMiary
    });
  }

  submit(form) {
    var rezult = {
      nazwa: form.value.nazwa,
      cenaNetto: form.value.cenaNetto,
      jednostkaMiary: form.value.jednostkaMiary
    };
    this.dialogRef.close(rezult);
  }
}

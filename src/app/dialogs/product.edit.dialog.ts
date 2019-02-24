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
      name: this.data.name,
      nettoPrice: this.data.nettoPrice,
      unit: this.data.unit
    });
  }

  submit(form) {
    var rezult = {
      name: form.value.name,
      nettoPrice: form.value.nettoPrice,
      unit: form.value.unit
    };
    this.dialogRef.close(rezult);
  }
}

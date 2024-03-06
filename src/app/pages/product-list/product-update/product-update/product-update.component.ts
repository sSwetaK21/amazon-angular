import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  constructor(
    public dialogref: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  updateForm!: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: this.data.title,
      category: this.data.category,
      brand: this.data.brand,
      color: this.data.color,
      description: this.data.description,
      imageUrl: this.data.imageUrl,
      price: this.data.price,
      discountedPrice: this.data.discountedPrice,
      size: this.data.size,
    });
  }

  updateProduct(updatedProductData: any) {
    if (this.updateForm.valid) {
      this.dialogref.close(this.updateForm.value);
    }
  }

  onCancel() {
    this.dialogref.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductsService
  ) {}
  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      category: '',
      brand: '',
      color: '',
      description: '',
      imageUrl: '',
      price: '',
      discountedPrice: '',
      size: '',
    });
  }

  addProduct() {
    // console.log(this.productForm.value);
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService.addProducts(this.productForm.value).subscribe(
        (res) => {
          console.log('Product added successfully', res);
          this.toastr.success('Product added successfully');
          this.productForm.reset();
        },
        (error) => {
          console.error('Error Occurred', error);
          this.toastr.error('Error occurred while adding product');
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }
}

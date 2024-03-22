import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  userList: any;
  paginator: any;
  sort: any;
  updateForm!: FormGroup;

  constructor(
    public dialogref: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private prodService: ProductsService,
    private cd: ChangeDetectorRef
  ) {}
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: [this.data.title],
      category: [this.data.category],
      brand: [this.data.brand],
      colors: [this.data.colors],
      description: [this.data.description],
      imageUrl: [this.data.imageUrl],
      price: [this.data.price],
      discountPrice: [this.data.discountPrice],
      size: [this.data.size],
    });
    // Fetch product data from ProductService
    this.prodService.getProducts().subscribe((products) => {
      // Initialize MatTableDataSource with the fetched data
      this.dataSource = new MatTableDataSource(products);
    });
    // this.updateForm.patchValue(this.data);
    // this.prodService.update().subscribe()
  }

  update(form: FormGroup) {
    if (this.updateForm.valid && this.data) {
      console.log(this.data);

      this.prodService
        .update(this.data.products_id, this.updateForm.value)
        .subscribe((res) => {
          this.dialogref.close(this.updateForm.value);
          // this.prodService.getProducts().subscribe((products) => {
          //   // Initialize MatTableDataSource with the fetched data
          //   this.dataSource = new MatTableDataSource(products);
          // });
        });

      this.cd.detectChanges;
    }
  }

  onCancel() {
    this.dialogref.close();
  }
}

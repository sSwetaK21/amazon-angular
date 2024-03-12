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
  constructor(
    public dialogref: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private prodService: ProductsService,
    private cd: ChangeDetectorRef
  ) {}
  dataSource!: MatTableDataSource<any>;

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
    // Fetch product data from ProductService
    this.prodService.getProducts().subscribe((products) => {
      // Initialize MatTableDataSource with the fetched data
      this.dataSource = new MatTableDataSource(products);
    });
    // this.updateForm.patchValue(this.data);
  }

  updateProduct(form: FormGroup) {
    if (form.valid) {
      if (this.data) {
        this.prodService.update(this.data.id, form.value).subscribe((res) => {
          // const updateIndex = this.dataSource?.data.findIndex(
          //   (row: any) => row.id === this.data.id.toString()
          // );
          // console.log(this.dataSource.data);
          // if (updateIndex !== -1) {
          //   this.dataSource.data[updateIndex] = form.value;
          //   this.dataSource._updateChangeSubscription();
          //   console.log('hii');
          // }
          this.dialogref.close(form.value);
        });
        this.cd.detectChanges;
      }
    }
  }

  onCancel() {
    this.dialogref.close();
  }
}

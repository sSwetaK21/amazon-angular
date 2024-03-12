import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/dataType';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  products: Product[] | undefined;
  currentDate: Date = new Date();
  constructor(
    private prodservice: ProductsService,
    private route: ActivatedRoute
  ) {}
  prodQuantity: number = 1;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.prodservice.getByID(id).subscribe((product) => {
      this.products = [product];
    });
  }

  handleQuantity(val: string) {
    if (this.prodQuantity < 20 && val === 'plus') {
      this.prodQuantity += 1;
    } else if (this.prodQuantity > 1 && val === 'min') {
      this.prodQuantity -= 1;
    } else {
      this.prodQuantity = 1;
    }
  }
}

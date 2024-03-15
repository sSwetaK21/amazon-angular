import { Component } from '@angular/core';
import { Product } from 'src/app/dataType';
import { ProductsService } from 'src/app/services/products.service';
import { filters } from '../products/filters';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent {
  filterData: any;
  products: undefined | Product[];

  constructor(
    private prodservice: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.filterData = filters;
    this.prodservice.getProducts().subscribe((product) => {
      this.products = product;
    });
  }

  onSelect(product: any): void {
    this.router.navigate(['/productCard', product.id]); // Navigate to product details route
  }

  multifilters(val: string, sectId: string) {
    console.log('value:', val, 'idd', sectId);
  }
}

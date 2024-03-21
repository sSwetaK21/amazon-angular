import { Component, Input, OnInit } from '@angular/core';
import { filters } from './filters';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/dataType';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private prodservice: ProductsService) {}
  filterData: any;
  // products: undefined | Product[];
  products: Product[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  ngOnInit() {
    this.filterData = filters;
    this.prodservice.getProducts().subscribe((product) => {
      this.products = product;
      console.log(this.products, 'this');
    });
    // this.sortFilters();
  }
  sortFilters() {
    this.products.sort((a: Product, b: Product) => {
      if (this.sortDirection === 'asc') {
        console.log(a.price, b.price);
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortFilters();
  }
}

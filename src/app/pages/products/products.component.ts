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
  products: Product[] = [];
  ngOnInit() {
    this.filterData = filters;
    this.prodservice.getProducts().subscribe((product) => {
      this.products = product;
    });
  }
}

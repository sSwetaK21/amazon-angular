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
  filteredProducts: Product[] = [];
  products: Product[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  ngOnInit() {
    this.filterData = filters;
    this.prodservice.getProducts().subscribe((product) => {
      this.products = product;
      this.filteredProducts = [...this.products];
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

  applyFilters() {
    this.filteredProducts = this.products.filter((product: Product) => {
      if (
        this.selectedColors.length > 0 &&
        !this.checkIfColorMatch(product.colors)
      ) {
        return false;
      }
      if (
        this.selectedSizes.length > 0 &&
        !this.checkIfSizeMatch(product.size)
      ) {
        return false;
      }
      return true;
    });
  }

  checkIfColorMatch(color: string[] | undefined): boolean {
    if (!color) return false;
    if (Array.isArray(color)) {
      return color.some((c) => this.selectedColors.includes(c));
    } else {
      return this.selectedColors.includes(color);
    }
  }
  checkIfSizeMatch(sizes: string[] | undefined): boolean {
    if (!sizes) return false;
    return sizes.some((size) => this.selectedSizes.includes(size));
  }

  updateFilters() {
    this.filteredProducts = this.products.filter((product: Product) => {
      if (
        this.selectedColors.length > 0 &&
        !this.checkIfColorMatch(product.colors)
      ) {
        return false;
      }
      if (
        this.selectedSizes.length > 0 &&
        !this.checkIfSizeMatch(product.size)
      ) {
        return false;
      }
      return true;
    });
  }
  updateSelectedColors(color: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedColors.push(color);
    } else {
      const index = this.selectedColors.indexOf(color);
      if (index !== -1) {
        this.selectedColors.splice(index, 1);
      }
    }
    this.updateFilters();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/dataType';
import { ProductsService } from 'src/app/services/products.service';
import { filters } from '../products/filters';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private prodservice: ProductsService
  ) {}
  searchProdResult: Product[] = [];
  filterData: any;
  searchQuery: string | undefined | null;
  noSearchRes = false;
  selectedColors: string[] = [];
  selectedSizes: string[] = [];

  ngOnInit(): void {
    this.filterData = filters;

    let query = this.activeRoute.snapshot.paramMap.get('query'); //from routing file => path: 'search/:query'
    // query &&
    //   this.prodservice.searchProducts(query).subscribe((results) => {
    //     this.searchProdResult = results;
    //     this.searchQuery = query;
    //     //for no res found
    //     if (this.searchProdResult.length < 1) {
    //       this.noSearchRes = true;
    //     }
    //   });
    if (query) {
      this.searchProducts(query);
    }
  }

  searchProducts(query: string): void {
    this.prodservice.getCategorySearch(query).subscribe(
      (results: Product[]) => {
        // Specify the type of results as Product[]
        this.searchProdResult = results;
        this.searchQuery = query;
        // Check if there are no search results
        this.noSearchRes = this.searchProdResult.length === 0;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );
  }

  applyFilters() {
    this.searchProdResult = this.searchProdResult.filter((product) => {
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

  updateFilters(categoryId: string, optionValue: string, isChecked: boolean) {
    if (categoryId === 'color') {
      if (isChecked) {
        this.selectedColors.push(optionValue);
      } else {
        const index = this.selectedColors.indexOf(optionValue);
        if (index !== -1) {
          this.selectedColors.splice(index, 1);
        }
      }
    } else if (categoryId === 'size') {
      if (isChecked) {
        this.selectedSizes.push(optionValue);
      } else {
        const index = this.selectedSizes.indexOf(optionValue);
        if (index !== -1) {
          this.selectedSizes.splice(index, 1);
        }
      }
    }

    // Apply filters whenever a checkbox state changes
    this.applyFilters();
  }
}

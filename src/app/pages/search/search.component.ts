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
  searchProdResult: undefined | Product[];
  filterData: any;
  searchQuery: string | undefined | null;
  noSearchRes = false;

  ngOnInit(): void {
    this.filterData = filters;

    let query = this.activeRoute.snapshot.paramMap.get('query'); //from routing file => path: 'search/:query'
    query &&
      this.prodservice.searchProducts(query).subscribe((results) => {
        this.searchProdResult = results;
        this.searchQuery = query;
        //for no res found
        if (this.searchProdResult.length < 1) {
          this.noSearchRes = true;
        }
      });
  }
}

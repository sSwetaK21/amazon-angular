import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/dataType';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private prodService: ProductsService) {}
  searchResult: undefined | Product[];
  username: string | null = null;
  cartItems = 0;

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');

    //cart number function here
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.prodService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement; //input se value lega
      // console.log(element.value);
      this.prodService
        .searchProducts(element.value)
        .subscribe((res: Product[]) => {
          if (res.length > 5) {
            res.length = 5;
          }
          this.searchResult = res;
          console.log(res);
        });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }
}

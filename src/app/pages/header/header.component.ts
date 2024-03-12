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
  products: Product[] = [];
  username: string | null = null;

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.prodService
        .searchProducts(element.value)
        .subscribe((res: Product[]) => {
          this.products = res;
          console.log(res);
        });
    }
  }
}

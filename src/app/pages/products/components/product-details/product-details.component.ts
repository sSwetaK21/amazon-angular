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
  removeCart = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.prodservice.getByID(id).subscribe((product) => {
        this.products = [product];
        // console.log(product);

        let cartData = localStorage.getItem('localCart');
        if (id && cartData) {
          let items: Product[] = JSON.parse(cartData);
          // items = items.filter((item: Product) => {
          //   item.id === id;
          // });
          // if (items.length) {
          //   this.removeCart = true;
          // } else {
          //   this.removeCart = false;
          // }

          //another way
          let isInCart = items.some((item: Product) => item.id === id); // Check if the current product is in the cart
          this.removeCart = isInCart; // some will return boolean whch we are storing in isinCart
        }
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

  AddToCart() {
    if (this.products) {
      this.products.forEach((product) => {
        product.quantity = this.prodQuantity;
      });
      // console.log(this.products);
      if (!sessionStorage.getItem('username')) {
        // console.log(this.products);
        this.prodservice.localCart(this.products);
        this.removeCart = true;
      } else {
        console.log('Add product to server cart if authenticated');
      }
    }
  }

  RemoveCart(prodId: any) {
    this.prodservice.removeFromCart(prodId);
    console.log('Remove product from cart');
    this.removeCart = false;
  }
}

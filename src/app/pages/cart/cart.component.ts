import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/dataType';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) {}
  cartData: Product[] = [];
  prodQuantity: number = 1;
  subtotal: number = 1;

  ngOnInit() {
    this.getData();
  }

  getData() {
    // this.cartData = this.prodService.getCartItems();
    let auth = localStorage.getItem('auth');
    if (auth) {
      let authObj = JSON.parse(auth);
      const userId = authObj.userId;
      // console.log(authObj, 'cartdata');

      this.prodService.getCartItems(userId).subscribe((items) => {
        console.log('==========', items);
        this.cartData = items as any[];
      });
    } else {
      console.log('error');
    }
  }

  remove(data: any) {
    // this.prodService.removeFromCart(pId);
    // this.cartData = this.prodService.getCartItems();
    let auth = localStorage.getItem('auth');
    if (auth) {
      let authObj = JSON.parse(auth);
      // const userId = authObj.userId;
      const userId = authObj.userId;
      console.log('User ID:', userId, this.cartData);
      this.prodService
        .removeFromCart(userId, data.product_Id)
        .subscribe((res) => {
          this.getData();
          console.log(res, 'deleted');
        });
    }
  }

  handleQuantity(val: string) {
    if (this.prodQuantity < 20 && val === 'plus') {
      this.prodQuantity += 1;
      // console.log('plus');
    } else if (this.prodQuantity > 1 && val === 'min') {
      this.prodQuantity -= 1;
    } else {
      this.prodQuantity = 1;
    }
  }
  updateQuantity(newQuantity: number) {
    this.prodQuantity = newQuantity;
    this.calculateQuantity();
  }

  calculateQuantity() {
    let subtotal = 0;
    for (const product of this.cartData) {
      if (typeof product.purchaseQuantity === 'number') {
        subtotal += product.purchaseQuantity * product.product.price;
      }
    }
    return subtotal;
  }
  // getTotalPrice(productId: any, quantity: number): number {
  //   const product = this.cartData.find(item => item.product.id === productId)?.product;
  //   return product ? product.price * quantity : 0;
  // }
}

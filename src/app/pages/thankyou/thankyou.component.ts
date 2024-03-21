import { Component, OnInit } from '@angular/core';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/dataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
})
export class ThankyouComponent implements OnInit {
  address: any;
  payments: any;
  cartData: Product[] = [];

  constructor(
    private checkout: CheckoutService,
    private prodService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.address = this.checkout.getaddress();
    this.payments = this.checkout.getPayments();

    // this.cartData = this.prodService.getCartItems();
    this.getData();
    console.log(this.cartData);

    // this.prodService.clearCart();
  }

  BackToHome(pID: any) {
    // this.prodService.removeFromCart(pID);
    this.router.navigate(['/home']);
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
}

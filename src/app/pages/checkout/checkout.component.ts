import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/dataType';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cardForm!: FormGroup;
  addresForm!: FormGroup;
  cartData: Product[] = [];

  username: string | null = null;

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private prodService: ProductsService
  ) {}
  ngOnInit(): void {
    this.addresForm = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.cardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      nameOnCard: ['', Validators.required],
    });
    this.username = sessionStorage.getItem('username');

    // this.cartData = this.prodService.getCartItems();
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
  OnsubmitAddress() {
    // console.log(this.addresForm.value);
    const addData = this.addresForm.value;
    this.checkoutService.setAddress(addData);
  }

  Onsubmitcard() {
    // console.log(this.cardForm.value);
    const payData = this.cardForm.value;
    this.checkoutService.setpayments(payData);
  }
}

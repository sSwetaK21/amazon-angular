import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  address: any;
  payments: any;

  constructor() {}

  setAddress(address: any) {
    this.address = address;
  }

  setpayments(pays: any) {
    this.payments = pays;
  }
  getaddress() {
    return this.address;
  }

  getPayments() {
    return this.payments;
  }
}

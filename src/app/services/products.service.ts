import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cart, Product } from '../dataType';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}
  cartData = new EventEmitter<Product[] | []>();
  private baseUrl = 'http://localhost:3000/products';

  addProducts(data: any): Observable<any> {
    return this._http.post<any>(this.baseUrl, data);
  }

  update(id: number, data: any) {
    return this._http.put(`http://localhost:3000/products/${id}`, data);
  }

  getByID(id: any) {
    return this._http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  getProducts() {
    return this._http.get<Product[]>(this.baseUrl);
  }

  deleteRow(rowId: string) {
    return this._http.delete(`${this.baseUrl}/${rowId}`);
  }

  searchProducts(query: string) {
    return this._http.get<Product[]>(
      `http://localhost:3000/products?category=${query}`
    );
  }

  localCart(data: Product[]) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify(data));
    } else {
      cartData = JSON.parse(localCart);
      if (!Array.isArray(cartData)) {
        //checks if this is an array
        cartData = [];
      }
      cartData.push(...data);
      console.log(cartData);

      localStorage.setItem('localCart', JSON.stringify(cartData));
    }

    this.cartData.emit(cartData);
  }

  removeFromCart(productId: any) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => item.id !== productId);
      console.log(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  // fetching cart

  addToCart(data: Cart) {
    return this._http.post('http://localhost:3000/cart', data);
  }
}

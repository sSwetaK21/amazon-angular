import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../dataType';

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
      `http://localhost:3000/products?q=${query}`
    );
  }

  localCart(data: Product[]) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify(data));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }

    this.cartData.emit(cartData);
  }
}

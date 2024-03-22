import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cart, Product } from '../dataType';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}
  cartData = new EventEmitter<Product[] | []>();
  private baseUrl = 'http://localhost:3000/products';

  // addProducts(data: any): Observable<any> {
  //   return this._http.post<any>(this.baseUrl, data);
  // }

  // update(id: number, data: any) {
  //   return this._http.put(`http://localhost:3000/products/${id}`, data);
  // }

  // getByID(id: any) {
  //   return this._http.get<Product>(`http://localhost:3000/products/${id}`);
  // }

  // getProducts() {
  //   return this._http.get<Product[]>(this.baseUrl);
  // }

  // deleteRow(rowId: string) {
  //   return this._http.delete(`${this.baseUrl}/${rowId}`);
  // }

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
      for (const item of data) {
        if (!cartData.some((cartItem) => cartItem.id == item.id)) {
          cartData.push(data);
        }
      }
      // cartData.push(...data);

      console.log(cartData);

      localStorage.setItem('localCart', JSON.stringify(cartData));
    }

    this.cartData.emit(cartData);
  }

  // removeFromCart(productId: any) {
  //   let cartData = localStorage.getItem('localCart');
  //   if (cartData) {
  //     let items: Product[] = JSON.parse(cartData);
  //     items = items.filter((item: Product) => item.id !== productId);
  //     console.log(items);
  //     localStorage.setItem('localCart', JSON.stringify(items));
  //     this.cartData.emit(items);
  //   }
  // }

  // fetching cart

  addToCart(userId: number, productId: number, quantity: number) {
    return this._http.post(
      `https://localhost:7219/api/Carts/addToCart/${userId}/${productId}/${quantity}`,
      {}
    );
  }

  // getCartItems() {
  //   const cartData = localStorage.getItem('localCart');
  //   return cartData ? JSON.parse(cartData) : [];
  // }

  clearCart() {
    localStorage.removeItem('localCart');
    this.cartData.emit([]);
  }

  // by dotnet api

  // private baseUrl = 'https://localhost:7219/api/products/getproducts';

  addProducts(data: any): Observable<any> {
    return this._http.post<any>(
      'https://localhost:7219/api/products/addproducts',
      data
    );
  }

  update(id: number, data: any) {
    return this._http.put(
      `https://localhost:7219/api/Products/updateProduct/${id}`,
      data,
      { responseType: 'text' }
    );
  }

  getByID(id: any) {
    return this._http.get<Product>(
      `https://localhost:7219/api/products/getproducts/${id}`
    );
  }

  getProducts() {
    return this._http.get<Product[]>(
      'https://localhost:7219/api/products/getproducts'
    );
  }

  removeFromCart(userId: any, productId: any) {
    return this._http.delete(
      `https://localhost:7219/api/Carts/removeCartItem/${userId}/${productId}`,
      { observe: 'response' }
    );
  }

  getCartItems(userId: any) {
    return this._http.get(`https://localhost:7219/api/Carts/cart/${userId}`);
  }
  getallCarts() {
    return this._http.get('https://localhost:7219/api/Carts/getCart');
  }

  deleteRow(rowId: any) {
    return this._http.delete(
      `https://localhost:7219/api/Products/delete/${rowId}`,
      { responseType: 'text' }
    );
  }

  getCategoryData(category: string) {
    return this._http.get(
      `https://localhost:7219/api/Products/getProductsbyCategory/${category}`
    );
  }

  getCategorySearch(category: string): Observable<Product[]> {
    return this._http.get<Product[]>(
      `https://localhost:7219/api/Products/getProductsbyCategory/${category}`
    );
  }
}

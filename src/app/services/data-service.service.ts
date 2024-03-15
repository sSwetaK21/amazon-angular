import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private _http: HttpClient) {}

  getUsersData(): Observable<any> {
    return this._http.get('http://localhost:3000/user');
  }

  getProductsData() {
    return this._http.get('http://localhost:3000/products');
  }
}

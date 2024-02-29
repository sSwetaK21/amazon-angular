import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  apiUrl = 'http://localhost:3000/user';

  getAll() {
    return this._http.get(this.apiUrl);
  }

  getByCode(code: any) {
    return this._http.get(this.apiUrl + '/' + code);
  }

  proceedRegister(userType: string, inputData: any) {
    return this._http.post(this.apiUrl, inputData);
  }

  deleteRow(rowId: string) {
    return this._http.delete(`${this.apiUrl}/${rowId}`);
  }
}

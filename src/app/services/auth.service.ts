import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  // apiUrl = 'http://localhost:3000/user';

  // getAll() {
  //   return this._http.get(this.apiUrl);
  // }

  // getByCode(code: any) {
  //   return this._http.get(this.apiUrl + '/' + code);
  // }

  // proceedRegister(userType: string, inputData: any) {
  //   return this._http.post(this.apiUrl, inputData);
  // }

  // deleteRow(rowId: string) {
  //   return this._http.delete(`${this.apiUrl}/${rowId}`);
  // }

  // by dotnet API here

  getAll() {
    return this._http.get('https://localhost:7219/api/users/getUsers');
  }

  getByname(code: any) {
    return this._http.get(`https://localhost:7219/api/users/getByname/${code}`);
  }
  private userId: number | undefined;

  login(loginData: any) {
    return this._http.post('https://localhost:7219/api/Users/login', loginData);
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('userId') !== null; // Checks if the userId is stored in session or not
  }

  proceedRegister(userType: string, inputData: any) {
    return this._http.post(
      'https://localhost:7219/api/users/register/',
      inputData
    );
  }

  deleteRow(rowId: string) {
    return this._http.delete(
      `https://localhost:7219/api/users/deleteRow/${rowId}`
    );
  }
}

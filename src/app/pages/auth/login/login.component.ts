import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private bd: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    sessionStorage.clear();
  }

  loginForm = this.bd.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    userType: ['customer', Validators.required],
  });
  userData: any;

  // Onsubmit() {
  //   if (this.loginForm.valid) {
  //     const userType = this.loginForm.value.userType;
  //     this.authService
  //       .getByCode(this.loginForm.value.username)
  //       .subscribe((res) => {
  //         this.userData = res;
  //         console.log(this.userData);
  //         if (this.userData) {
  //           if (this.userData.password === this.loginForm.value.password) {
  //             sessionStorage.setItem('username', this.userData.id);
  //             this.toastr.success('Logged In succesfully');

  //             if (userType === 'admin') {
  //               this.router.navigate(['/dashboard']);
  //             } else {
  //               this.router.navigate(['/header']);
  //               this.router.navigate(['/home']);
  //             }
  //           } else {
  //             this.toastr.error('Please contact Admin', 'Inactive User');
  //           }
  //         } else {
  //           this.toastr.warning('Invalid Credentials');
  //         }
  //       });
  //   } else {
  //     this.toastr.error('Please Enter Valid values');
  //   }
  // }

  Onsubmit() {
    if (this.loginForm.valid) {
      const userType = this.loginForm.value.userType;

      this.authService
        .login({
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            let auth = localStorage.setItem('auth', JSON.stringify(res));
            this.toastr.success('You are Logged In Sucessfully', 'Welcome');
            console.log(auth);
            this.router.navigate(['/home']);
            if (userType === 'admin') {
              this.router.navigate(['dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            console.log(err);
            this.toastr.warning('Invalid credentials', 'Try again');
          },
        });
    } else {
      this.toastr.error('Please Enter Valid Values');
    }

    // Onsubmit() {
    //   if (this.loginForm.valid) {
    //     const userType = this.loginForm.value.userType;
    //     this.authService
    //       .getByname(this.loginForm.value.username)
    //       .subscribe((res) => {
    //         this.userData = res;
    //         console.log(this.userData);
    //         if (this.userData) {
    //           if (this.userData.password === this.loginForm.value.password) {
    //             sessionStorage.setItem('username', this.userData.id);
    //             this.toastr.success('Logged In succesfully');
    //             console.log(this.userData);
    //             if (userType === 'admin') {
    //               this.router.navigate(['/dashboard']);
    //             } else if (userType === 'customer') {
    //               this.router.navigate(['/home']);
    //             } else {
    //               this.router.navigate(['/dashboard']);
    //             }
    //           } else {
    //             this.toastr.warning('Invalid Credentials');
    //           }
    //         } else {
    //           this.toastr.warning('Invalid Credentials');
    //         }
    //       });
    //   } else {
    //     this.toastr.error('Please Enter Valid values');
    //   }
  }
}

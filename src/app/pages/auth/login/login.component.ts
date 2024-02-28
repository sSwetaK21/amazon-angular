import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  Onsubmit() {
    if (this.loginForm.valid) {
      const userType = this.loginForm.value.userType;
      this.authService
        .getByCode(this.loginForm.value.username)
        .subscribe((res) => {
          this.userData = res;
          console.log(this.userData);
          if (this.userData) {
            if (this.userData.password === this.loginForm.value.password) {
              sessionStorage.setItem('username', this.userData.id);
              this.toastr.success('Logged In succesfully');

              if (userType === 'admin') {
                this.router.navigate(['/dashboard']);
              } else {
                this.router.navigate(['/home']);
              }
            } else {
              this.toastr.error('Please contact Admin', 'Inactive User');
            }
          } else {
            this.toastr.warning('Invalid Credentials');
          }
        });
    } else {
      this.toastr.error('Please Enter Valid values');
    }
  }
}

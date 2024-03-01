import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.builder.group({
    userType: ['customer', Validators.required],
    id: [''],
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required])
      // password pattern here
      // Validators.pattern('((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
    ),
  });

  // proceedRegister() {
  //   console.log(this.registerForm);
  //   if (this.registerForm.valid) {
  //     const userType: string = this.registerForm.value.userType || 'customer';
  //     this.authService
  //       .proceedRegister(userType, this.registerForm.value)
  //       .subscribe((res) => {
  //         this.toastr.success(
  //           'Please contact Admin to enable Access',
  //           'Registration Successfully'
  //         );
  //         console.log('form');
  //         this.router.navigate(['/login']);
  //       });
  //   } else {
  //     this.toastr.warning('Please enter Valid data', 'Invalid Data');
  //   }
  // }

  proceedRegister() {
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      const userType: string = this.registerForm.value.userType || 'customer';

      this.authService
        .proceedRegister(userType, this.registerForm.value)
        .subscribe(
          (res) => {
            // Handle successful registration
            this.toastr.success('Registered successfully');
            this.router.navigate(['/login']);
          },
          (error) => {
            // Handle registration error
            console.error(error);
            this.toastr.error('Registration failed');
          }
        );
    } else {
      this.toastr.error('Please Enter Valid values');
    }
  }
}

import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-reqeust.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest;
  errorMessages: string[] = [];

  constructor(private authService: AuthService, 
    private cookieService: CookieService, 
    private router: Router, 
    private toastr: ToastrService,
    private spinner: SpinnerVisibilityService) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void {
    this.spinner.show();
    this.authService.login(this.model).subscribe({
      next: response => {
        // Set auth cookie
        this.cookieService.set('Authorization', `Bearer  ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

        // Set user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        // Redirect to Home
        this.router.navigateByUrl('/');
        this.toastr.success(`Hello, ${response.email}!`);
        this.spinner.hide();
      },
      error: err => {
        this.spinner.hide();
        console.log(err); 
        const errorMessage = err.error ? err.error : 'An unknown error occurred';
      
        Swal.fire({
          title: 'Error!',
          text: errorMessage, // Displaying the specific error message
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      
    });
    }
}

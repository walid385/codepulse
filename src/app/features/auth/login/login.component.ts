import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-reqeust.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest;

  constructor(private authService: AuthService, 
    private cookieService: CookieService, 
    private router: Router, 
    private toastr: ToastrService) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void {
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

      },
      error: err => {
        console.log(err);
        this.toastr.error('Invalid email or password');
      }
    });
    }
}

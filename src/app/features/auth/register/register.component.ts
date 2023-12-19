import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../models/register.request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterRequest;
  errorMessages: string[] = [];
  

  constructor(private authService: AuthService, 
    private cookieService: CookieService, 
    private toastr: ToastrService, 
    private router: Router) {
    this.model = {
      email: '',
      password: '',
      passwordConfirmed: ''
    };
    
  }
  ngOnInit(): void {

  }
  
  

  onFormSubmit(): void {
    this.authService.register(this.model).subscribe({
      next: () => {
        this.model = {
          email: '',
          password: '',
          passwordConfirmed: ''
        };
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully registered!',
          icon: 'success',
          confirmButtonText: 'Ok'
          });
        this.router.navigateByUrl('/auth/login');
      },
      error: err => {
        this.errorMessages = err.error.errors[''];
        console.log(this.errorMessages)
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!' ,
          icon: 'error',
          confirmButtonText: 'Ok'
          });
      }
    });
  }
}

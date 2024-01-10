import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../models/register.request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormControl } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterRequest;
  errorMessages: string[] = [];
  

  constructor(private authService: AuthService, 
    private spinner: SpinnerVisibilityService) {
    this.model = {
      email: '',
      password: '',
      passwordConfirmed: ''
    };
    
  }
  ngOnInit(): void {

  }
  
  

  onFormSubmit(): void {
    this.spinner.show();
    this.authService.register(this.model).subscribe({
      next: () => {
        this.model = {
          email: '',
          password: '',
          passwordConfirmed: ''
        };
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully registered!, Please confirm your email',
          icon: 'success',
          confirmButtonText: 'Ok'
          });
          this.spinner.hide();
      },
      error: err => {
        this.spinner.hide();
        this.errorMessages = err.error.errors[''];
        console.log(this.errorMessages)
        Swal.fire({
          title: '<h1>Error!</h1>', 
          html: '<p style="font-size: 2rem;">Something went wrong, try again!</p>',
          icon: 'error',
          confirmButtonText: '<span style="font-size: 1.5rem;">OK</span>',
          confirmButtonColor: '#3f7e2e'
        });
      }
    });
  }
}

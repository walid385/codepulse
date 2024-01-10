import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ForgotPassword } from '../models/forgot-password.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  user$?: Observable<User>
  model: ForgotPassword;
  errorMessages: string[] = [];

  constructor(private authService: AuthService, 
    private toastr: ToastrService, 
    private router: Router,
    private spinner: SpinnerVisibilityService,
    private route: ActivatedRoute) {
    this.model = {
      email: '',
      clientURI: ''
     }

  }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    this.model.clientURI = window.location.origin + '/reset-password'
    this.spinner.show();
    this.authService.forgotPassword(this.model).subscribe({
      next: () => {
        console.log(this.model)
        Swal.fire({
          title: 'Success!',
          text: 'An email has been sent to your email address, please check your email',
          icon: 'success',
          confirmButtonText: 'Ok'
          });
          this.model.email = '';
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


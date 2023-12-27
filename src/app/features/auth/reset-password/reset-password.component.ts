import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordDto } from '../models/reset-password.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  model: ResetPasswordDto;

  constructor(private authService: AuthService, 
    private spinner: SpinnerVisibilityService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.model = {
      email: '',
      password: '',
      confirmPassword: '',
      token: ''
    }
}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.model.email = this.route.snapshot.queryParams['email'];
      this.model.token = this.route.snapshot.queryParams['token'];
    });
    console.log(this.model)
  }

  onFormSubmit(): void{
    this.spinner.show();
    this.authService.resetPassword(this.model).subscribe({
      next: () => {
        this.spinner.hide();
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been reset successfully, please login now',
          icon: 'success',
          confirmButtonText: 'Ok'
          });
          this.router.navigateByUrl('/login');
      },
      error: err => {
        this.spinner.hide();
        console.log(err)
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong! Please try again',
          icon: 'error',
          confirmButtonText: 'Ok'
          });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEmail } from '../models/confirm-email';
import Swal from 'sweetalert2';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private authService: AuthService,
   private router:Router,
   private activatedRoute: ActivatedRoute,
   private spinner: SpinnerVisibilityService ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];

      const confirmEmail: ConfirmEmail = {
        token: params['token'],
        email: params['email']
      };

      this.authService.confirmEmail(confirmEmail).subscribe({
        next: () => {
          Swal.fire({
            title: 'Success!',
            text: 'You have successfully confirmed your email! Please login to continue',
            icon: 'success',
            confirmButtonText: 'Start now'
          });
          this.router.navigateByUrl('/login');
          this.spinner.hide();
        },
        error: (err: any) => {
          this.spinner.hide();
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong! Please try again or contact support',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
    
      });
    }
    );
  }

}


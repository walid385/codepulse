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
            title: '<h1>Success!</h1>', 
            html: '<p style="font-size: 2rem;">You have successfully confirmed your email! Please login to continue</p>',
            icon: 'success',
            confirmButtonText: '<span style="font-size: 1.5rem;">OK</span>',
            confirmButtonColor: '#3f7e2e'
            });
            this.router.navigate(['/login']);
            this.spinner.hide();
        },
        error: (err: any) => {
          this.spinner.hide();
          console.log(err);
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
    );
  }

}


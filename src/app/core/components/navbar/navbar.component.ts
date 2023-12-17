import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: User

  constructor(private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) { } 


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;

      }
    });

    this.user = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.toastr.warning('You have been logged out!');
  }


}

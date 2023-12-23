import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Category } from 'src/app/features/category/models/category.model';
import { CategoryService } from 'src/app/features/category/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  category$?: Observable<Category[]>;
  user?: User
  categories: Category[] = [];

  constructor(private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef) { } 


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;

      }
    });

    this.user = this.authService.getUser();

    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
      },
      error => {
        console.log(error);
      }
    );


    this.categoryService.refreshCategories();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.toastr.warning('You have been logged out!');
  }


}

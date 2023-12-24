import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../category/models/category.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-categoriy-blogs',
  templateUrl: './categoriy-blogs.component.html',
  styleUrls: ['./categoriy-blogs.component.css']
})
export class CategoriyBlogsComponent implements OnInit {

  category: Category[] = [];
  category$?: Observable<Category[]>;
  id: string | null | number = null;
  categoryBlog: any[] | undefined = [];
  user?: User;
  isLoading: boolean = true; // Add this line

  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        this.isLoading = true; // Set loading to true when starting to load

        if (this.id) {
          this.category$ = this.categoryService.getAllCategoriesWithPosts();
          this.user = this.authService.getUser();
          this.category$.subscribe({
            next: (response) => {
              this.category = response;
              this.category.forEach((category) => {
                if (category.id === this.id) {
                  this.categoryBlog = category.blogPosts;
                }
              });
              this.isLoading = false; // Set loading to false when blogs are loaded
            },
            error: (err) => {
              this.isLoading = false; // Ensure loading is false even if there's an error
            }
          });
        } else {
          this.isLoading = false; // Set loading to false if no id is found
        }
      }
    });
  }

  NaviToBlog(url: string): void {
    this.router.navigateByUrl(`/blog/${url}`);
  }
}

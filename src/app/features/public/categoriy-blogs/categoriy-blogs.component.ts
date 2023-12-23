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

  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.category$ = this.categoryService.getAllCategoriesWithPosts();
          this.user = this.authService.getUser();
          this.category$.subscribe({
            next: (response) => {
              this.category = response;
              this.category.forEach((category) => {
                if (category.id === this.id) {
                  this.categoryBlog = category.blogPosts;
                  
                  this.categoryBlog?.forEach((blog) => {

                  }
                  );
                }
              });
            }
          });
        }
      }
    });
  }

  NaviToBlog(url: string): void {
    this.router.navigateByUrl(`/blog/${url}`);
  }
}

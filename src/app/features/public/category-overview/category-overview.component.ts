import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.css']
})
export class CategoryOverviewComponent implements OnInit {
  category$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService,
    private spinner: SpinnerVisibilityService) { }

ngOnInit(): void {
  this.category$ = this.categoryService.getAllCategoriesWithPosts();
  this.category$.subscribe({
    next: (categories) => { // This should log the array of categories with their blog posts
    },
    error: (err) => {
    }
  });

  
}






  // Updated method to accept a category ID
  jaja(categoryId: number) {
    this.spinner.show();
    this.categoryService.getAllCategoriesWithPosts().subscribe({
      next: (category) => {
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
      }
    });

  }
}

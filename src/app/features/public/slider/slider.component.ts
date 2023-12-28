import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
    category$?: Observable<Category[]>;
    categories: Category[] = []; // Define the categories array property
    currentIndex = 0;
  
    constructor(private categoryService: CategoryService) { }
  
    ngOnInit(): void {
      this.category$ = this.categoryService.getAllCategoriesWithPosts();
      this.category$.subscribe(categories => {
        this.categories = categories; // Assign the emitted values to the categories array property
      });
    }
  
    moveSlide(direction: number): void {
      this.currentIndex += direction;
      if (this.currentIndex < 0) {
        this.currentIndex = this.categories.length - 1; // Use the categories array property
      } else if (this.currentIndex >= this.categories.length) {
        this.currentIndex = 0; // Use the categories array property
      }
    }
  
    setSlide(index: number): void {
      this.currentIndex = index;
    }
  
    jaja(categoryId: number): void {
      // Handle the category click action
    }
  }
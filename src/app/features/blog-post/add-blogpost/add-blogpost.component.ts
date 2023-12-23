import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { BlogPostService } from '../services/blog-post.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy, OnInit {

  isImageSelectorOpen: boolean = false;

  model: AddBlogpostRequest
  createBlogPostSubscription?: Subscription;
  categories$? : Observable<Category[]>

  imageSelectSubscription?: Subscription;
  constructor(private blogPostService: BlogPostService, private toastr: ToastrService,
    private router: Router, private categoryService: CategoryService, private imageService: ImageService) {
    this.model =
    {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '', 
      isVisible: true,
      categories: []
   }
}
  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategoriesWithPosts();
    this.imageSelectSubscription=this.imageService.onSelectImage().subscribe({
      next: (response) => {
        if (this.model) {
          this.model.featuredImageUrl = response.url;
          this.isImageSelectorOpen = false;
          if (this.model.featuredImageUrl) {
            this.toastr.success('Image selected!');
          }
        }
      }
    });

  }

onFormSubmit() {
  console.log(this.model);
  this.createBlogPostSubscription=this.blogPostService.createBlogPost(this.model)
  .subscribe({
    next: (response) => {
      this.router.navigateByUrl('/admin/blogposts');
      this.toastr.success('Blog post added successfully!')
    },
    error: (err) => {
      this.toastr.error('Failed to add blog post');
    }
  });

}

onOpenImageSelector(): void {
  this.isImageSelectorOpen = true;
};

closeImageSelector(): void {
  this.isImageSelectorOpen = false;
}

onCloseImage(): void {
  if (this.model) {
    this.model.featuredImageUrl = '';
  }
}


ngOnDestroy(): void {
  this.createBlogPostSubscription?.unsubscribe();
  this.imageSelectSubscription?.unsubscribe();
}

}

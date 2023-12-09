import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { BlogPostService } from '../services/blog-post.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy, OnInit {

  model: AddBlogpostRequest
  createBlogPostSubscription?: Subscription;
  categories$? : Observable<Category[]>
  constructor(private blogPostService: BlogPostService, private toastr: ToastrService,
    private router: Router, private categoryService: CategoryService) {
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
    this.categories$=this.categoryService.getAllCategories();
  }

onFormSubmit() {
  console.log(this.model);
  this.createBlogPostSubscription=this.blogPostService.createBlogPost(this.model)
  .subscribe({
    next: (response) => {
      this.toastr.success('Blog post added successfully');
      this.router.navigateByUrl('/admin/blogposts');
    },
    error: (err) => {
      console.log(err);
      alert('Something went wrong');
    }
  });

}


ngOnDestroy(): void {
  this.createBlogPostSubscription?.unsubscribe();
}

}

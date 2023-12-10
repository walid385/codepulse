import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blogpost.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPostRequest } from '../models/update-blogPost-request.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?:  Subscription;
  model?: BlogPost;
  categories$? : Observable<Category[]>;
  selectedCategory?: any[];
  blogPost?: BlogPost;
  editBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  isImageSelectorOpen: boolean = false;

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private categoryService: CategoryService,
    private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
   this.categories$= this.categoryService.getAllCategories();

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {

         this.getBlogPostSubscription= this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategory = response.categories.map(x => x.id);
            }
          });
        
        }

  }
});

}

onFormSubmit(): void {
  if (this.model && this.id){
    var updateBlogPostRequest: UpdateBlogPostRequest = {
      title: this.model.title,
      shortDescription: this.model.shortDescription,
      content: this.model.content,
      featuredImageUrl: this.model.featuredImageUrl,
      urlHandle: this.model.urlHandle,
      publishedDate: this.model.publishedDate,
      author: this.model.author,
      isVisible: this.model.isVisible,
      categories: this.selectedCategory ?? []
  };
  this.editBlogPostSubscription= this.blogPostService.updateBlogPost(this.id, updateBlogPostRequest).subscribe({
    next: (response) => {
      this.toastr.success('Blog Post updated successfully!');
      this.router.navigateByUrl('/admin/blogposts');
    },
    error: (error) => {
      this.toastr.error('Something went wrong!');
    }
  });
  }
}

onDelete(): void {
  if (this.id){
    this.deleteBlogPostSubscription=this.blogPostService.deleteBlogPost(this.id).subscribe({
      next: (response) => {
        this.toastr.error('Blogpost deleted successfully!');
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }
}

onOpenImageSelector(): void {
  this.isImageSelectorOpen = true;
};

closeImageSelector(): void {
  this.isImageSelectorOpen = false;
}

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }

}


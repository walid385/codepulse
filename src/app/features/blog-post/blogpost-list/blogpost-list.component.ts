import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPosts$? : Observable<BlogPost[]>;
  
    constructor(private blogPostService: BlogPostService, private spinner: SpinnerVisibilityService) { }

    

  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }
}

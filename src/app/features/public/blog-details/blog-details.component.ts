import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blogpost.model';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  url: string | null = null;
  blogPost$?: Observable<BlogPost>;

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private spinner: SpinnerVisibilityService) { }


  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe({
      next: (params) => {
       this.url = params.get('url');
      }
    });

    if(this.url){
      this.blogPost$=this.blogPostService.getBlogPostByUrlHandler(this.url);
    }
    this.spinner.hide();
  }




}

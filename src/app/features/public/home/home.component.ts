import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blogpost.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogPostService, private router: Router) { }


  ngOnInit(): void {
   this.blogs$ = this.blogPostService.getAllBlogPosts();
  }

  NaviToBlog(url: string): void {
    this.router.navigateByUrl(`/blog/${url}`);
  }


}

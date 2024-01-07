import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blogpost.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {

  blogPosts$: BlogPost[] = [];
  randomPost: BlogPost[] = [];
  id : number = 0;

  constructor(private blogPostService: BlogPostService, private router: Router) { }



  ngOnInit(): void {
    this.blogPostService.getAllBlogPosts().subscribe({
      next: blogPosts => {
        this.blogPosts$ = blogPosts;
        console.log(this.blogPosts$);
      },
      error: err => console.log(err)
    })
  }


  showRandomPost(): BlogPost {
    return this.blogPosts$[Math.floor(Math.random() * this.blogPosts$.length)];
  }

  naviToArticles(url: string): void {
    this.router.navigateByUrl(`/blog/${url}`);
  }
  
  
  }



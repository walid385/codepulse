import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blogpost.model';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]>;
  model?: Observable<BlogPost>;
  user?: User;
  blogi?: any;

  constructor(private blogPostService: BlogPostService, private router: Router, private authService: AuthService ) { 
  }


  ngOnInit(): void {
   this.blogs$ = this.blogPostService.getAllBlogPosts();
    this.user = this.authService.getUser();
    console.log(this.user);
    this.blogs$.subscribe({
      next: (data) => {
        this.blogi = data;
        console.log(this.blogi);
      }
    });

   
  }


  NaviToBlog(url: string): void {
    this.router.navigateByUrl(`/blog/${url}`);
  }

  getSpanSize(index: number): number {
    // Custom logic for varying the span size
    // Example: First item spans 2 columns, next two items span 1, fourth item spans 3, and then the pattern repeats
    const pattern = [3, 1, 1, 3]; // Define the repeating pattern of column spans
    return pattern[index % pattern.length]; // Use modulo to repeat the pattern
  }


  

}

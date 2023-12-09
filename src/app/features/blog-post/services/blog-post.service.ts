import { Injectable } from '@angular/core';
import { AddCategoryComponent } from '../../category/add-category/add-category.component';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogpostRequest) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts`, data);
  }

  getAllBlogPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }
}

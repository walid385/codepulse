import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories = new BehaviorSubject<Category[]>([]);
  categories$ = this._categories.asObservable();


  refreshCategories() {
    this.getAllCategoriesWithPosts().subscribe(categories => {
      this._categories.next(categories);
    });
  }
  constructor(private http:HttpClient, private cookieService:CookieService ) { 
  
  }

  addCategory(model:AddCategoryRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories?addAuth=true`, model);
  }  

  getAllCategoriesWithPosts(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories/withposts`);
  }

  getCategoryById(id:string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  updateCategory(id:string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`, updateCategoryRequest);
  }

  deleteCategory(id:string): Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`);
  }

}

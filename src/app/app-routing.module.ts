import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { ConfirmEmailComponent } from './features/auth/confirm-email/confirm-email.component';
import { CategoryOverviewComponent } from './features/public/category-overview/category-overview.component';
import { CategoriyBlogsComponent } from './features/public/categoriy-blogs/categoriy-blogs.component';
import { HeroComponent } from './features/public/hero/hero.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';

const routes: Routes = [

  {
    path:'hero',
    component: HeroComponent
  },

  {
    path: 'blogpost/all',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'confirm-email',
    component: ConfirmEmailComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    component: CategoryOverviewComponent
  },
  {
    path: 'categories/blogs/:id',
    component: CategoriyBlogsComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
  {
  path: 'admin/categories',
  component: CategoryListComponent,
  canActivate: [authGuard]
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard]
  },
  {
  path: 'admin/blogposts',
  component: BlogpostListComponent,
  canActivate: [authGuard]
  },

  {
  path: 'admin/blogposts/add',
  component: AddBlogpostComponent,
  canActivate: [authGuard]
  },

  {
  path: 'admin/blogposts/:id',
  component: EditBlogpostComponent,
  canActivate: [authGuard]
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

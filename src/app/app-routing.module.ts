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
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { SliderComponent } from './features/public/slider/slider.component';
import { AboutComponent } from './features/public/about/about.component';
import { RecentComponent } from './features/public/recent/recent.component';
import { ContactusComponent } from './features/public/contactus/contactus.component';
const routes: Routes = [

  {
    path:'hero',
    component: HeroComponent
  },

  {
    path:'contact',
    component: ContactusComponent
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
    path: 'recent',
    component: RecentComponent
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
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'categories/all',
    component: CategoryOverviewComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    component: HeroComponent
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

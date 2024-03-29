import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { RegisterComponent } from './features/auth/register/register.component';
import Swal from 'sweetalert2';
import { ConfirmEmailComponent } from './features/auth/confirm-email/confirm-email.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CategoryOverviewComponent } from './features/public/category-overview/category-overview.component';
import { CategoriyBlogsComponent } from './features/public/categoriy-blogs/categoriy-blogs.component';
import { HeroComponent } from './features/public/hero/hero.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { FooterComponent } from './core/components/footer/footer/footer.component';
import { SliderComponent } from './features/public/slider/slider.component';
import { AboutComponent } from './features/public/about/about.component';
import { RecentComponent } from './features/public/recent/recent.component';
import { TrendComponent } from './features/public/trend/trend.component';
import { ContactusComponent } from './features/public/contactus/contactus.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    CategoryOverviewComponent,
    CategoriyBlogsComponent,
    HeroComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FooterComponent,
    SliderComponent,
    AboutComponent,
    RecentComponent,
    TrendComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MarkdownModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

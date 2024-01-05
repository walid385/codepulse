import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent {

  constructor(private router: Router) { }

  naviToCategories(): void {
    this.router.navigateByUrl('/categories/all');
  }

  naviToArticles(): void {
    this.router.navigateByUrl('/blogpost/all');
  }

  naviToAbout(): void {
    this.router.navigateByUrl('/about');
  }
}

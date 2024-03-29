import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {

  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.images$ = this.imageService.getAllImages();
  }

  onFileUploadChange(event: Event): void {
    const element = (event.currentTarget as HTMLInputElement);
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: (response) => {
          this.toastr.success('Image uploaded successfully');
          this.images$ = this.imageService.getAllImages();
          this.imageUploadForm?.reset();
        },

      });

    } else {
      this.toastr.error('Please fill all fields');
    }
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  };

  removeImage(id: string): void {
    this.imageService.removeImage(id.toUpperCase()).subscribe({
      next: (response) => {
        this.toastr.warning('Image removed successfully');
        this.images$ = this.imageService.getAllImages();
      }
    });
  }

}

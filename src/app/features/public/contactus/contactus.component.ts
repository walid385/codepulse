import { Component } from '@angular/core';
import { ContactMessage } from '../models/contact.model';
import { ContactUsService } from '../services/contactus.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  model: ContactMessage;

  constructor(
    private contactUsService: ContactUsService,
    private toastr: ToastrService,
    private spinner: SpinnerVisibilityService
  ) {
    this.model = {
      name: '',
      email: '',
      message: ''
    };
  }

   onFormSubmit() {
    this.spinner.show();
    this.contactUsService.sendContactUsMessage(this.model).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toastr.success('Message sent successfully');
        this.model = {
          name: '',
          email: '',
          message: ''
        };
      },
      (err: any) => {
        this.spinner.hide();
        this.toastr.error('Message could not be sent');
      }
    );
   }
}

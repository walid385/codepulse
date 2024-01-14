import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ContactMessage } from "../models/contact.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })

export class ContactUsService{

    constructor(
        private http: HttpClient
    ){}

    sendContactUsMessage(data: ContactMessage): any{
        return this.http.post<ContactMessage>(`${environment.apiBaseUrl}/api/contactus`, data);
    }
}
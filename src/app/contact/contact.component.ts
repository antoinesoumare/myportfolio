import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  email: string='';
  fullname: string='';
  phoneno: string='';
  message: string='';
  hideMessage = true;
  serverUrl = environment.server;

  constructor(private http: HttpClient) { 
    
  }

  submitForm(){
    console.log("Email: " + this.email);
    console.log("Full Name: " + this.fullname);
    console.log("Phone No: " + this.phoneno);
    console.log("Message: " + this.message);
    let FormData = {
      data: {
        "email": this.email,
        "FullName": this.fullname,
        "PhoneNo": this.phoneno,
        "Message": this.message
      }
    }
    this.http.post<any>(this.serverUrl+'/api/leads', FormData).subscribe(res => {
      console.log(res);
      if(res.data === null){

      }
      else{
        this.hideMessage = false;
      }
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { About } from '../interfaces/about.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private http: HttpClient){}
  about: any; 
  aboutText:string = '';
  headShot:string = '';
  serverUrl= environment.server;
  ngOnInit(): void {
    
    this.http.get<About>(this.serverUrl + '/api/about?populate=*').subscribe( response => {
      console.log(response);
      this.about = response;
      this.aboutText = response.data.attributes.AboutText;
      this.headShot = this.serverUrl+response.data.attributes.Headshot.data.attributes.formats.medium.url;
    })

  }

}

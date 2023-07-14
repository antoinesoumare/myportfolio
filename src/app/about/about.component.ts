import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { About } from '../interfaces/about.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private http: HttpClient){}
  about: any; 
  aboutText:string = '';
  headShot:string = ''
  ngOnInit(): void {
    
    this.http.get<About>('http://localhost:1337/api/about?populate=*').subscribe( response => {
      console.log(response);
      this.about = response;
      this.aboutText = response.data.attributes.AboutText;
      this.headShot = 'http://localhost:1337'+response.data.attributes.Headshot.data.attributes.formats.medium.url;
    })

  }

}

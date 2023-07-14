import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data: any;
  serverUrl = environment.server;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<any>(this.serverUrl+'/api/welcome?populate=*').subscribe( response => {
      console.log(response);
      this.data = response;
      console.log('Data',this.data);
    })

  }

}

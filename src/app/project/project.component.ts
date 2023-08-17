import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  allProjects: any[] = [];
  displayedProjects: any[] = [];
  projects: any[] = []; 
  serverUrl = environment.server;
  imageUrl= this.serverUrl
  loading = true;

  j_Projects: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    if(environment.production) {
      this.imageUrl = '';
    }
    this.loadAllProjects();
    this.j_loadAllProjects('all');
  }

  j_loadAllProjects(category: string): void {
    this.loading = true;
    let url= this.serverUrl + '/api/projects?populate=*';
    if (category !== 'all') {
      url += '&filters[Category][$eq]=' + category;
    }
    this.http.get<any>(url).subscribe(response => {
      this.loading = false;
      this.j_Projects = response.data;
      console.log('Projects', this.j_Projects);
    })
  }

  loadAllProjects(): void {
    this.http.get<any>(this.serverUrl+'/api/projects?populate=*').subscribe(response => {
      console.log(response);
      this.projects = response; 
      this.allProjects = this.projects; 
      this.displayedProjects = this.allProjects;
      console.log('Projects', this.projects);
    });
  }


  loadDesignProjects(): void {
    this.http.get<any>(this.serverUrl + '/api/projects?filters[Category][$eq]=Design').subscribe(response => {
      console.log(response);
      this.displayedProjects = [response]; 
    });
  }

  loadWebProjects(): void {
    this.http.get<any>(this.serverUrl + '/api/projects?filters[Category][$eq]=Web').subscribe(response => {
      console.log(response);
      this.displayedProjects = [response]; 
    });
  }


}


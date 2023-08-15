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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAllProjects();
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

  loadProjectsByCategory(category: string): void {
    if (category === 'all') {
      this.displayedProjects = this.allProjects;
    } else {
      this.displayedProjects = this.allProjects.filter(project => project.category === category);
    }
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

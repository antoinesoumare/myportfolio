import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projects } from '../interfaces/projects.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projects: any;
  projectTitle: string = '';
  projectDescription: string = '';
  Github: string = '';
  ProjectURL: string = '';
  constructor(private http: HttpClient) { }
  serverUrl = environment.server;

  ngOnInit(): void {

    this.http.get<Projects>(this.serverUrl+'/api/projects?populate=*').subscribe(response => {
      console.log(response);
      this.projects = response;
      // this.projectTitle = response.data;
      // this.projectDescription = response.data.attributes.ProjectDescription;
      // this.Github = response.data.attributes.Github;
      // this.ProjectURL = response.data.attributes.ProjectURL;
      console.log('Projects', this.projects);
    })
  }
}

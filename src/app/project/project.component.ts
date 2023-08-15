// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Projects } from '../interfaces/projects.interface';
// import { environment } from 'src/environments/environment';

// @Component({
//   selector: 'app-project',
//   templateUrl: './project.component.html',
//   styleUrls: ['./project.component.css']
// })
// export class ProjectComponent implements  OnInit {
//   allProjects: any[]= [];
//   displayedProjects: any[]= [];
//   projects: any;
//   projectTitle: string = '';
//   projectDescription: string = '';
//   Github: string = '';
//   ProjectURL: string = '';
//   constructor(private http: HttpClient) { }
//   serverUrl = environment.server;

//   ngOnInit(): void {
//     this.loadAllProjects();
    

//     this.http.get<Projects>(this.serverUrl+'/api/projects?populate=*').subscribe(response => {
//       console.log(response);
//       this.projects = response;
//       // this.projectTitle = response.data;
//       // this.projectDescription = response.data.attributes.ProjectDescription;
//       // this.Github = response.data.attributes.Github;
//       // this.ProjectURL = response.data.attributes.ProjectURL;
//       console.log('Projects', this.projects);
//     })
//   }

//   loadAllProjects(): void {
//     this.http.get<Projects>(this.serverUrl+'/api/projects?populate=*').subscribe(response => {
//       console.log(response);
//       this.projects = response;
//       this.allProjects = response.data;
//       this.displayedProjects = this.allProjects;
//       console.log('Projects', this.projects);
//     })

//   }

//   loadProjectsByCategory(category: string): void {
//     if (category === 'all') {
//         this.displayedProjects = this.allProjects;
//     } else {
//         this.displayedProjects = this.allProjects.filter(project => project.category === category);
//     }
// }

//   loadDesignProjects(): void {
//       this.displayedProjects = this.allProjects.filter(project => project.category === 'Design');
//   }

//   loadWebProjects(): void {
//       this.displayedProjects = this.allProjects.filter(project => project.category === 'Web');
//   }
// }

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment'; // Make sure the path is correct

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  allProjects: any[] = [];
  displayedProjects: any[] = [];
  projects: any[] = []; // Initialize as an array
  serverUrl = environment.server;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAllProjects();
  }

  loadAllProjects(): void {
    this.http.get<any>(this.serverUrl+'/api/projects?populate=*').subscribe(response => {
      console.log(response);
      this.projects = response; // Assuming the response structure matches your Projects interface
      this.allProjects = this.projects; // Assign the projects to allProjects
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
      this.displayedProjects = [response]; // Assuming the response contains a single project
    });
  }

  loadWebProjects(): void {
    this.http.get<any>(this.serverUrl + '/api/projects?filters[Category][$eq]=Web').subscribe(response => {
      console.log(response);
      this.displayedProjects = [response]; // Assuming the response contains a single project
    });
  }


}

import { Injectable } from '@angular/core';
import { ApiGetService } from "./api-get.service";
import { Project } from '../model/project';
import { RiskRegistersService } from './risk-registers.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {


  //TODO
  //change all mock url's with backend endpoints

  public currentProject: Project;

  constructor(private apiGetService: ApiGetService, private riskRegistersService: RiskRegistersService) { 
    this.currentProject = new Project();
  }

  getProjects() {
    let promise = new Promise((resolve, reject) => {
      this.apiGetService.get('http://www.mocky.io/v2/5ec46d43300000f33d39c883').subscribe( res => {
        var projects = JSON.parse(JSON.stringify(res));
        resolve(projects);
      });
    });
    return promise;
  }

  getProjectDetails(id: number): any {
    let promise = new Promise((resolve, reject) => {
      var url = '';
      if(id === 0)
        url = 'http://www.mocky.io/v2/5ecd54f23200004f002368d5';
      else if(id === 1)
        url = 'http://www.mocky.io/v2/5ec46c09300000df0639c87e';
      else if(id === 2)
        url = 'http://www.mocky.io/v2/5ec46c1f300000f33d39c87f';
      else
        url = 'http://www.mocky.io/v2/5ecd63f43000006900ea0abe';

      //get details
      this.apiGetService.get(url).subscribe( res => {
        var project = JSON.parse(JSON.stringify(res));
        this.currentProject.id = project.id;
        this.currentProject.name = project.name;
        this.currentProject.description = project.description;
        //get risk registers
        this.riskRegistersService.getRiskRegisters(project.id).then( result => {
          this.currentProject.riskRegisters = result;
          resolve(this.currentProject);
        });
      });
    });
    return promise;
  }

  getEditDetails(id: number): Project {
    if(this.currentProject.id != null && this.currentProject.id === id ) { //make sure currentProject is requested project
      return this.currentProject;
    } else { //fetch data for requested project
      this.getProjectDetails(id).then(
        result => {
          return result;
        }
      );
    }
  }


  createProject(name: string, description: string) {
    var project = {
      name: name,
      description: description
    }
    this.apiGetService.apiPost("project/create", project).subscribe( res => {
      console.log("after createProject");
    });
  }

  updateProject(id: number, name: string, description: string) {
    var projectDetails = {
      id: id,
      name: name,
      description: description
    }
    var endpoint = 'Project/Edit/' + id;
    this.apiGetService.apiPost(endpoint, projectDetails).subscribe( res => {
      console.log("after updateProject");
    });
  }

  deleteProject(id: number) {
    this.apiGetService.apiPost("project/delete/" + id, {}).subscribe( res => {
      console.log("after deleteProject");
    });
  }

}

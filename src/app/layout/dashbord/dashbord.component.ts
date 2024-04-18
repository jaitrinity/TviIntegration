import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  //templateUrl: './dashbord.component.html',
  // template: '<app-nbs-status></app-nbs-status>',
  template: '<app-airtel-status></app-airtel-status>',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  // loginEmpId = "";
  // loginEmpRole = "";
  // commaSeparateCircleName = "";
  constructor() {
    // this.loginEmpId = localStorage.getItem("empId");
    // this.loginEmpRole = localStorage.getItem("empRole")
    // this.commaSeparateCircleName = localStorage.getItem("circleName");
  }

  ngOnInit() {
  }

}

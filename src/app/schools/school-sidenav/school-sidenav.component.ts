import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-sidenav',
  templateUrl: './school-sidenav.component.html',
  styleUrls: ['./school-sidenav.component.css']
})
export class SchoolSidenavComponent implements OnInit {
  selectedSchoolId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params["schoolId"];
      console.log(this.selectedSchoolId);
    })
  }

}

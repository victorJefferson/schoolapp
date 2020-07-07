import { Subscription } from 'rxjs';
import { SchoolService } from './../school.service';
import { School } from './../school.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.css']
})
export class ViewSchoolComponent implements OnInit, OnDestroy {
  selectedSchoolId: string;
  selectedSchool: School;
  schools: School[] = [];
  schoolsSubs: Subscription;

  constructor(private schoolService: SchoolService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    this.schoolsSubs = this.schoolService.schoolsSub.subscribe((schools: School[])=> {
      this.schools = schools;
    });
    this.schools = this.schoolService.initSchools();
    this.selectedSchool = this.schools.find(e => e.schoolId === this.selectedSchoolId);
  }

  ngOnDestroy(){
    this.schoolsSubs.unsubscribe();
  }

}

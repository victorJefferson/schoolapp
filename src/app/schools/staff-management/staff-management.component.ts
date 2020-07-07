import { Component, OnInit, OnDestroy } from '@angular/core';
import { School } from '../school.model';
import { Subscription } from 'rxjs';
import { SchoolService } from '../school.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit, OnDestroy {
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

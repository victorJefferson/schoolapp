import { User } from './../main-user/user.model';
import { Injectable } from '@angular/core';
import { School } from './school.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools: School[] = [];
  private users: User[];
  schoolsSub = new Subject<School[]>();
  private schoolToEdit: School;
  private selectedSchoolId: string;

  constructor(private router: Router) {
    this.schools.push({schoolId: "s1", name: "NPS", city: "Namchi", admin: null});
    this.schools.push({schoolId: "s2", name: "Velammal", city: "Chennai", admin: null});
  }
  initSchools(){
    return [...this.schools];
  }

  emitNextSchoolsValue(){
    this.schoolsSub.next([...this.schools]);
  }

  addSchool(schoolName: string, city: string){
    let schoolId = this.generateSchoolId();
    this.schools.push({schoolId: schoolId, name: schoolName, city: city, admin: null});
    this.emitNextSchoolsValue();
    this.router.navigate(['/']);
  }

  updateSchool(schoolId: string, schoolName: string, city: string, admin: string){
    this.schoolToEdit = this.schools.find(e => e.schoolId === schoolId);
    let indexOfSchool = this.schools.indexOf(this.schoolToEdit);
    this.schools[indexOfSchool] = {
      schoolId: schoolId,
      name: schoolName,
      city: city,
      admin: admin
    }
    this.emitNextSchoolsValue();
  }

  selectSchool(selectSchoolId: string){
    this.selectedSchoolId = selectSchoolId;
    this.router.navigate(["/viewSchool",this.selectedSchoolId]);
  }

  setSelectedSchoolId(schoolId: string){
    this.selectedSchoolId = schoolId;
  }

  getSelectedSchoolId(){
    return this.selectedSchoolId;
  }

  generateSchoolId(){
    let id = this.schools.length + 1;
    let schoolId = "s" + id;
    return schoolId;
  }
}

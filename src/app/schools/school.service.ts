import { Sub } from './subject.model';
import { Class } from './class.model';
import { UserService } from './../main-user/user.service';
import { Injectable } from '@angular/core';
import { School } from './school.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools: School[] = [];
  private classes: Class[] = [];
  private subjects: Sub[] = [];
  schoolsSub = new Subject<School[]>();
  classesSub = new Subject<Class[]>();
  subjectsSub = new Subject<Sub[]>();
  private schoolToEdit: School;
  private selectedSchoolId: string;

  constructor(private router: Router, private userService: UserService) {
    this.schools.push({schoolId: "s1", name: "NPS", city: "Namchi", admin: null});
    this.schools.push({schoolId: "s2", name: "Velammal", city: "Chennai", admin: null});
    this.classes.push({classId: "c1", name: "One", schoolId: "s1", teacherId: "u5", repId: null});
    this.subjects.push({subjectId: "sub1", name: "English", classId: "c1", schoolId: "s1", performance: [{userId: "u1", marks: 56}, {userId: "u2", marks: 56} ]});
  }
  initSchools(){
    return [...this.schools];
  }

  emitNextSchoolsValue(){
    this.schoolsSub.next([...this.schools]);
  }

  initClasses(){
    return [...this.classes];
  }

  emitNextClassesValue(){
    this.classesSub.next([...this.classes]);
  }

  initSubjects(){
    return [...this.subjects];
  }

  emitNextSubjectsValue(){
    this.subjectsSub.next([...this.subjects]);
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
    this.userService.assignSchoolToUser(admin, schoolId);
    this.userService.assignDesignationToUser(admin, "admin");
  }

  addClassToSchool(className: string, schoolId: string, teacherId: string, repId?: string){
    if(repId){
      console.log("Rep");
      return;
    }
    let classId = this.generateClassId();
    this.classes.push
    ({
      classId: classId,
      name: className,
      schoolId: schoolId,
      teacherId: teacherId,
      repId: null
    })
    this.emitNextClassesValue();
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
    let lastSchoolIndex = this.schools.length - 1;
    let lastSchool = this.schools[lastSchoolIndex];
    let lastSchoolId = lastSchool.schoolId;
    let nextSchoolIdNum = Number(lastSchoolId.substr(1,1)) + 1;
    let schoolId = "s" + nextSchoolIdNum;
    return schoolId;
  }

  generateClassId(){
    let lastclassIndex = this.classes.length - 1;
    let lastclass = this.classes[lastclassIndex];
    let lastclassId = lastclass.classId;
    let nextclassIdNum = Number(lastclassId.substr(1,1)) + 1;
    let classId = "c" + nextclassIdNum;
    return classId;
  }
}

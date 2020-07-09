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
  private refClasses: Array<string> = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]

  constructor(private router: Router, private userService: UserService) {
    this.schools.push({schoolId: "s1", name: "NPS", city: "Namchi", admin: null});
    this.schools.push({schoolId: "s2", name: "Velammal", city: "Chennai", admin: null});
    this.classes.push({classId: "c1", name: "One", schoolId: "s1", teacherId: "u5", repId: null});
    this.subjects.push({subjectId: "sub1", name: "English", classId: "c1", teacherId: "u5", schoolId: "s1", performance: [{userId: "u1", marks: 56}, {userId: "u2", marks: 56} ]});
    this.subjects.push({subjectId: "sub2", name: "Maths", classId: "c1", teacherId: "u6", schoolId: "s1", performance: [{userId: "u1", marks: 56}, {userId: "u2", marks: 56} ]});
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

  updateSubject(subject: Sub){
    console.log(subject);
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
    return classId;
  }

  addClassTemplateToSchool(template: string, schoolId: string){
    if(template){
      this.classes = this.classes.filter((o) => {
        return o.schoolId !== schoolId;
      });
      this.subjects = this.subjects.filter((o) => {
        return o.schoolId !== schoolId;
      });
    }
    if (template === 'primary'){
      let i;
      for (i=0; i<5; i++){
        this.addClassToSchool(this.refClasses[i], schoolId, undefined, undefined);
      }
    }
    if (template === 'secondary'){
      let i;
      for (i=0; i<10; i++){
        this.addClassToSchool(this.refClasses[i], schoolId, undefined, undefined);
      }
    }
    if (template === 'higherSecondary'){
      let i;
      for (i=0; i<12; i++){
        this.addClassToSchool(this.refClasses[i], schoolId, undefined, undefined);
      }
    }
    this.emitNextSubjectsValue();
  }

  addSubjectToClassInSchool(subjectName: string, classId: string, teacherId: string, schoolId: string){
    let subjectId = this.generateSubjectId();
    this.subjects.push
    ({
      subjectId: subjectId,
      name: subjectName,
      classId: classId,
      schoolId: schoolId,
      teacherId: teacherId,
      performance: undefined
    })
    this.emitNextSubjectsValue();
  }

  assignTeacherToClass(userId: string, classId: string){
    let classToUpdate = this.classes.find(e => e.classId === classId);
    let classToUpdateIndex = this.classes.indexOf(classToUpdate);
    this.classes[classToUpdateIndex].teacherId = userId;
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
    if(!this.schools.length){
      return "s1";
    }
    let lastSchoolIndex = this.schools.length - 1;
    let lastSchool = this.schools[lastSchoolIndex];
    let lastSchoolId = lastSchool.schoolId;
    let nextSchoolIdNum = Number(lastSchoolId.substr(1,1)) + 1;
    let schoolId = "s" + nextSchoolIdNum;
    return schoolId;
  }

  generateClassId(){
    if(!this.classes.length){
      return "c1";
    }
    let lastclassIndex = this.classes.length - 1;
    let lastclass = this.classes[lastclassIndex];
    let lastclassId = lastclass.classId;
    let nextclassIdNum = Number(lastclassId.substr(1,1)) + 1;
    let classId = "c" + nextclassIdNum;
    return classId;
  }

  generateSubjectId(){
    if(!this.subjects.length){
      return "sub1";
    }
    let lastSubIndex = this.subjects.length - 1;
    let lastSub = this.subjects[lastSubIndex];
    let lastSubId = lastSub.subjectId;
    let nextSubIdNum = Number(lastSubId.substr(3,1)) + 1;
    let subId = "sub" + nextSubIdNum;
    return subId;
  }
}

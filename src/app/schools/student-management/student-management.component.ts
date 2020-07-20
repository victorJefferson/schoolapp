import { User } from 'src/app/main-user/user.model';
import { UserService } from './../../main-user/user.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Class } from './../class.model';
import { SchoolService } from './../school.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit, OnDestroy {
  selectedSchoolId: string;
  classes: Class[] = [];
  classesSubs: Subscription;
  selectedClass: Class;
  thisSchoolStudents: User[] = [];
  thisSchoolStudentsSubs: Subscription;

  constructor(private route: ActivatedRoute, private schoolService: SchoolService, private userService: UserService) { }

  ngOnInit(){
    // Get the SchoolId from URL Params
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    // Initialize Classes in this school
    this.initializeClassesInThisSchool();
    // Initialize Students in this school
    this.initializeStudentsOfThisSchool();
  }

  initializeClassesInThisSchool(){
    this.classesSubs = this.schoolService.classesSub.subscribe(
      (classes) => {
        this.getClassesInThisSchool(classes);
      }
    )
    let initThisSchoolClasses = this.schoolService.initClasses();
    this.getClassesInThisSchool(initThisSchoolClasses);
  }

  getClassesInThisSchool(classes: Class[]){
    this.classes = [];
    let i;
    for (i = 0; i < classes.length; i++){
      if(classes[i].schoolId == this.selectedSchoolId){
        this.classes.push(classes[i]);
      }
    }
  }

  initializeStudentsOfThisSchool(){
    this.thisSchoolStudentsSubs = this.userService.usersSubj.subscribe(
      (users) => {
        this.getStudentsAssignedToThisSchool(users);
      }
    )
    let initThisSchoolStaffs = this.userService.initUsers();
    this.getStudentsAssignedToThisSchool(initThisSchoolStaffs);
  }

  getStudentsAssignedToThisSchool(users: User[]){
    this.thisSchoolStudents = [];
    let i;
    for (i = 0; i < users.length; i++){
      if(users[i].role == "student" && users[i].schoolId == this.selectedSchoolId){
        this.thisSchoolStudents.push(users[i]);
      }
    }
  }

  onSelectClass(selectedClass: Class){
    this.selectedClass = selectedClass;
  }

  onDeselectClass(){
    this.selectedClass = undefined;
  }

  onAddStudent(form: NgForm){
    if(form.invalid){
      return;
    }
    this.userService.addStudent(form.value.studentName,form.value.email, this.selectedClass.classId, this.selectedSchoolId);
    form.resetForm();
  }

  ngOnDestroy(){
    this.classesSubs.unsubscribe();
    this.thisSchoolStudentsSubs.unsubscribe();
  }

}

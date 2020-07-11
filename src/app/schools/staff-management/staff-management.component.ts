import { Sub } from './../subject.model';
import { Class } from './../class.model';
import { NgForm } from '@angular/forms';
import { UserService } from './../../main-user/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SchoolService } from '../school.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/main-user/user.model';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit, OnDestroy {
  selectedSchoolId: string;
  classes: Class[] = [];
  subjects: Sub[] = [];
  SelectedSubjects: Sub[] = [];
  classesSubs: Subscription;
  subjectSubs: Subscription;
  thisSchoolStaffsSubs: Subscription;
  thisSchoolStaffs: User[] = [];
  activatedTabForStaffTools: string = "myStaffs";
  selectedExistingUserId: string;
  selectedClass: Class;
  selectedClassSubs: Subscription;

  constructor(
    private schoolService: SchoolService,
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    // Initialize Staffs assigned to this school Array
    this.initializeStaffsOfThisSchool();
    // Initialize Classes in this school
    this.initializeClassesInThisSchool();
    // Initialize Subjects to Classes
    this.initializeSubjectsToClasses();
    // To Receive the selected Class, also after adding Subject to that class and to Initiate subjects belonging to that class
    this.selectedClassSubs = this.schoolService.selectedClassSubj.subscribe(selecetedClass => {
      this.selectedClass = selecetedClass;
      this.SelectedSubjects = this.subjects.filter((o) => {
        return o.classId === this.selectedClass.classId;
      });
    })
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

  initializeStaffsOfThisSchool(){
    this.thisSchoolStaffsSubs = this.userService.usersSubj.subscribe(
      (users) => {
        this.getStaffsAssignedToThisSchool(users);
      }
    )
    let initThisSchoolStaffs = this.userService.initUsers();
    this.getStaffsAssignedToThisSchool(initThisSchoolStaffs);
  }

  initializeSubjectsToClasses(){
    this.subjectSubs = this.schoolService.subjectsSub.subscribe(
      (subjects) => {
        this.getSubjectsInThisSchool(subjects);
      }
    )
    let initSubs = this.schoolService.initSubjects();
    this.getSubjectsInThisSchool(initSubs);
  }

  getStaffsAssignedToThisSchool(users: User[]){
    this.thisSchoolStaffs = [];
    let i;
    for (i = 0; i < users.length; i++){
      if(users[i].role == "staff" && users[i].schoolId == this.selectedSchoolId){
        this.thisSchoolStaffs.push(users[i]);
      }
    }
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

  getSubjectsInThisSchool(subjects: Sub[]){
    this.subjects = [];
    let i;
    for (i = 0; i < subjects.length; i++){
      if(subjects[i].schoolId == this.selectedSchoolId){
        this.subjects.push(subjects[i]);
      }
    }
  }

  assignTeacherToClass(form: NgForm){
    if(form.invalid){
      return;
    }
    this.schoolService.assignTeacherToClass(form.value.teacherId,this.selectedClass.classId);
  }

  onRemoveStaff(){
    return;
  }

  onEditSubject(){
    // console.log(subjectId);
  }

  ngOnDestroy(){
    this.thisSchoolStaffsSubs.unsubscribe();
    this.classesSubs.unsubscribe();
    this.subjectSubs.unsubscribe();
    this.selectedClassSubs.unsubscribe();
  }
}

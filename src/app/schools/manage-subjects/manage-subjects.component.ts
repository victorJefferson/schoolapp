import { Class } from './../class.model';
import { SchoolService } from './../school.service';
import { UserService } from './../../main-user/user.service';
import { Subscription } from 'rxjs';
import { User } from './../../main-user/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.css']
})
export class ManageSubjectsComponent implements OnInit, OnDestroy {
  selectedSchoolId: string;
  thisSchoolStaffs: User[];
  thisSchoolStaffsSubs: Subscription;
  classes: Class[];
  classesSubs: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService, private schoolService: SchoolService) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    // Initialize Staffs assigned to this school Array
    this.initializeStaffsOfThisSchool();
    // Initialize Classes in this school
    this.initializeClassesInThisSchool();
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

  getStaffsAssignedToThisSchool(users: User[]){
    this.thisSchoolStaffs = [];
    let i;
    for (i = 0; i < users.length; i++){
      if(users[i].role == "staff" && users[i].schoolId == this.selectedSchoolId){
        this.thisSchoolStaffs.push(users[i]);
      }
    }
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

  onAddSubject(form: NgForm){
    if(form.invalid){
      return;
    }
    this.schoolService.addSubjectToClassInSchool(form.value.subName, form.value.classId, form.value.teacherId, this.selectedSchoolId);
    form.resetForm();
  }

  ngOnDestroy(){
    this.thisSchoolStaffsSubs.unsubscribe();
    this.classesSubs.unsubscribe();
  }
}

import { UserService } from './../../main-user/user.service';
import { User } from './../../main-user/user.model';
import { SchoolService } from './../school.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Class } from '../class.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit, OnDestroy {
  selectedSchoolId: string;
  activatedTabForClassTools: string = "allClasses";
  classes: Class[] = [];
  classesSubs: Subscription;
  thisSchoolStaffs: User[] = [];
  thisSchoolStaffsSubs: Subscription;
  selectedClassTemplate: string;
  selectedClass: Class;

  constructor(private route: ActivatedRoute, private schoolService: SchoolService, private userService: UserService) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    // Initialize Classes in this school
    this.initializeClassesInThisSchool();
    // Initialize Staffs assigned to this school Array
    this.initializeStaffsOfThisSchool();
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

  onAddClass(form: NgForm){
    if(form.invalid){
      return;
    }
    let classId = this.schoolService.addClassToSchool(
      form.value.className,
      this.selectedSchoolId,
      form.value.teacherId,
      undefined
    );
    this.activatedTabForClassTools = "allClasses";
    this.onSelectClass(classId);
  }

  onAddClassTemplate(form: NgForm){
    if(form.invalid){
      return;
    }
    this.schoolService.addClassTemplateToSchool(form.value.template, this.selectedSchoolId);
    form.resetForm();
    this.activatedTabForClassTools = "allClasses";
    this.selectedClass = undefined;
  }

  onSelectClass(classId: string){
    this.schoolService.selectClassToDisplay(classId);
  }

  onSelectClassTab(tab: string){
    this.activatedTabForClassTools = tab;
  }

  ngOnDestroy(){
    this.classesSubs.unsubscribe();
  }


}

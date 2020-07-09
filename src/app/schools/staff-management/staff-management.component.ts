import { Sub } from './../subject.model';
import { Class } from './../class.model';
import { NgForm } from '@angular/forms';
import { UserService } from './../../main-user/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { School } from '../school.model';
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
  selectedSchool: School;
  schools: School[] = [];
  classes: Class[] = [];
  subjects: Sub[] = [];
  schoolsSubs: Subscription;
  staffsSubs: Subscription;
  classesSubs: Subscription;
  subjectSubs: Subscription;
  thisSchoolStaffsSubs: Subscription;
  staffsNotassignedToSchools: User[] = [];
  thisSchoolStaffs: User[] = [];
  activatedTabForStaffTools: string = "myStaffs";
  activatedTabForClassTools: string = "allClasses";
  activatedTabForSubTools: string = "addSub";
  selectedExistingUserId: string;
  selectedClass: Class;
  selectedClassTemplate: string;
  trial: number = 2;

  constructor(
    private schoolService: SchoolService,
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    // Initialize Staffs not assigned to any school Array
    this.initializeStaffsNotAssignedToSchools();
    // Initialize Staffs assigned to this school Array
    this.initializeStaffsOfThisSchool();
    // Initialize Classes in this school
    this.initializeClassesInThisSchool();
    // Initialize Subjects to Classes
    this.initializeSubjectsToClasses();
    this.selectedClass = this.classes[0];
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

  initializeStaffsNotAssignedToSchools(){
    this.staffsSubs = this.userService.usersSubj.subscribe(
      (users) => {
        this.getStaffsNotAssignedToSchool(users);
      }
    )
    let initUsers = this.userService.initUsers();
    this.getStaffsNotAssignedToSchool(initUsers);
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

  getStaffsNotAssignedToSchool(initUsers: User[]){
    this.staffsNotassignedToSchools = [];
    let i;
    for (i = 0; i < initUsers.length; i++){
      if(initUsers[i].role == "staff" && initUsers[i].schoolId == null){
        this.staffsNotassignedToSchools.push(initUsers[i]);
      }
    }
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

  onAddStaff(form: NgForm){
    if (form.invalid){
      return;
    }
    let userId = this.userService.addUser(form.value.staffName, form.value.email, "staff");
    this.userService.assignSchoolToUser(userId, this.selectedSchoolId);
    this.userService.assignDesignationToUser(userId, form.value.designation);
    form.resetForm();
    this.activatedTabForStaffTools = "myStaffs";
  }

  onAssignStaff(form: NgForm){
    if(form.invalid){
      return;
    }
    this.userService.assignSchoolToUser(form.value.existingUserId, this.selectedSchoolId);
    this.userService.assignDesignationToUser(form.value.existingUserId, form.value.designation);
    form.resetForm();
    this.activatedTabForStaffTools = "myStaffs";
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

  onAddSubject(form: NgForm){
    if(form.invalid){
      return;
    }
    this.schoolService.addSubjectToClassInSchool(form.value.subName, form.value.classId, form.value.teacherId, this.selectedSchoolId);
    this.selectedClass = this.classes.find(e => e.classId === form.value.classId);
    form.resetForm();
  }

  onEditSubject(){
    // console.log(subjectId);
  }

  onSelectClass(classId: string){
    this.selectedClass = this.classes.find(e => e.classId === classId);
  }

  onSelectStaffTab(tab: string){
    this.activatedTabForStaffTools = tab;
  }

  onSelectClassTab(tab: string){
    this.activatedTabForClassTools = tab;
  }

  onSelectSubTab(tab: string){
    this.activatedTabForSubTools = tab;
  }


  ngOnDestroy(){
    this.staffsSubs.unsubscribe();
    this.thisSchoolStaffsSubs.unsubscribe();
    this.classesSubs.unsubscribe();
  }
}

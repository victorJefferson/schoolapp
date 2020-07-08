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
  schoolsSubs: Subscription;
  staffsSubs: Subscription;
  thisSchoolStaffsSubs: Subscription;
  staffsNotassignedToSchools: User[] = [];
  thisSchoolStaffs: User[] = [];
  activatedTab: string = "myStaffs";
  selectedExistingUserId: string;

  constructor(
    private schoolService: SchoolService,
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    // Initialize School Array
    this.schoolsSubs = this.schoolService.schoolsSub.subscribe((schools: School[])=> {
      this.schools = schools;
    });
    this.schools = this.schoolService.initSchools();
    // Initialize Staffs not assigned to any school Array
    this.selectedSchool = this.schools.find(e => e.schoolId === this.selectedSchoolId);
    this.schools = this.schoolService.initSchools();
    this.staffsSubs = this.userService.usersSubj.subscribe(
      (users) => {
        this.getStaffsNotAssignedToSchool(users);
      }
    )
    let initUsers = this.userService.initUsers();
    this.getStaffsNotAssignedToSchool(initUsers);
    // Initialize Staffs assigned to this school Array
    this.thisSchoolStaffsSubs = this.userService.usersSubj.subscribe(
      (users) => {
        this.getStaffsAssignedToThisSchool(users);
      }
    )
    let initThisSchoolStaffs = this.userService.initUsers();
    this.getStaffsAssignedToThisSchool(initThisSchoolStaffs);
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

  onAddStaff(form: NgForm){
    if (form.invalid){
      return;
    }
    let userId = this.userService.addUser(form.value.staffName, form.value.email, "staff");
    this.userService.assignSchoolToUser(userId, this.selectedSchoolId);
    this.userService.assignDesignationToUser(userId, form.value.designation);
    form.resetForm();
    this.activatedTab = "myStaffs";
  }

  onAssignStaff(form: NgForm){
    if(form.invalid){
      return;
    }
    this.userService.assignSchoolToUser(form.value.existingUserId, this.selectedSchoolId);
    this.userService.assignDesignationToUser(form.value.existingUserId, form.value.designation);
    form.resetForm();
    this.activatedTab = "myStaffs";
  }

  onRemoveStaff(){
    return;
  }

  onSelectTab(tab: string){
    this.activatedTab = tab;
  }

  ngOnDestroy(){
    this.schoolsSubs.unsubscribe();
    this.staffsSubs.unsubscribe();
    this.thisSchoolStaffsSubs.unsubscribe();
  }
}

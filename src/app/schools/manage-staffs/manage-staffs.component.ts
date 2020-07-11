import { UserService } from './../../main-user/user.service';
import { User } from './../../main-user/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-staffs',
  templateUrl: './manage-staffs.component.html',
  styleUrls: ['./manage-staffs.component.css']
})
export class ManageStaffsComponent implements OnInit, OnDestroy {
  selectedSchoolId: string;
  staffsNotassignedToSchools: User[] = [];
  thisSchoolStaffs: User[] = [];
  thisSchoolStaffsSubs: Subscription;
  staffsSubs: Subscription;
  activatedTabForStaffTools: string = "myStaffs";
  selectedExistingUserId: string;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.selectedSchoolId = params['schoolId'];
    });
    // Initialize Staffs not assigned to any school Array
    this.initializeStaffsNotAssignedToSchools();
    // Initialize Staffs assigned to this school Array
    this.initializeStaffsOfThisSchool();
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

  initializeStaffsNotAssignedToSchools(){
    this.staffsSubs = this.userService.usersSubj.subscribe(
      (users) => {
        this.getStaffsNotAssignedToSchool(users);
      }
    )
    let initUsers = this.userService.initUsers();
    this.getStaffsNotAssignedToSchool(initUsers);
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

  onAssignStaff(form: NgForm){
    if(form.invalid){
      return;
    }
    this.userService.assignSchoolToUser(form.value.existingUserId, this.selectedSchoolId);
    this.userService.assignDesignationToUser(form.value.existingUserId, form.value.designation);
    form.resetForm();
    this.activatedTabForStaffTools = "myStaffs";
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

  onSelectStaffTab(tab: string){
    this.activatedTabForStaffTools = tab;
  }

  ngOnDestroy(){
    this.staffsSubs.unsubscribe();
  }

}

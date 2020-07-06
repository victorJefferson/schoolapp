import { UserService } from './../../main-user/user.service';
import { SchoolService } from './../school.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { School } from '../school.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from 'src/app/main-user/user.model';

@Component({
  selector: 'app-view-schools',
  templateUrl: './view-schools.component.html',
  styleUrls: ['./view-schools.component.css']
})
export class ViewSchoolsComponent implements OnInit, OnDestroy {
  schools: School[];
  users: User[] = [];
  schoolSubs: Subscription;
  userSubs: Subscription;
  viewSchoolMode: boolean = false;
  editSchoolMode: boolean = false;
  selecetedSchool: School;
  editSchoolForm: FormGroup;

  constructor(private schoolService: SchoolService, private userService: UserService) {
  }

  ngOnInit(){
    this.schoolSubs = this.schoolService.schoolsSub.subscribe(
      (schools) => {
        this.schools = schools;
      }
    );
    this.schools = this.schoolService.initSchools();
    this.userSubs = this.userService.usersSubj.subscribe(
      (users) => {
        this.getAdminUsers(users);
      }
    )
    let initUsers = this.userService.initUsers();
    this.getAdminUsers(initUsers);
  }

  onSelectSchool(schoolId: string){
    this.editSchoolMode = false;
    this.viewSchoolMode = true;
    this.selecetedSchool = this.schools.find(e => e.schoolId === schoolId);
  }

  onEditSchool(schoolId: string){
    this.viewSchoolMode = false;
    this.editSchoolMode = true;
    this.selecetedSchool = this.schools.find(e => e.schoolId === schoolId);
    this.initForm(this.selecetedSchool.name,this.selecetedSchool.city,this.selecetedSchool.admin);
  }

  initForm(name: string, city: string, admin: string){
    this.editSchoolForm = new FormGroup({
      'schoolName': new FormControl(name, {validators: [Validators.required, Validators.minLength(3)]}),
      'city': new FormControl(city, {validators: [Validators.required]}),
      'admin': new FormControl(admin, {validators: [Validators.required]})
    })
  }

  onEditForm(){
    if(this.editSchoolMode && this.editSchoolForm.valid){
      this.schoolService.updateSchool(
        this.selecetedSchool.schoolId,
        this.editSchoolForm.value.schoolName,
        this.editSchoolForm.value.city,
        this.editSchoolForm.value.admin
      )
      this.editSchoolMode = false;
    }
  }

  getAdminUsers(initUsers: User[]){
    let i;
    for (i = 0; i < initUsers.length; i++){
      if(initUsers[i].role == "admin"){
        this.users.push(initUsers[i]);
      }
    }
  }

  disableViewMode(){
    this.viewSchoolMode = false;
  }

  disableEditMode(){
    this.editSchoolMode = false;
  }

  ngOnDestroy(){
    this.schoolSubs.unsubscribe();
  }
}

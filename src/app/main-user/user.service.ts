import { Subject } from 'rxjs';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  usersSubj = new Subject<User[]>();
  constructor() {
    this.users.push({userId: "u1", name: "Victor Jefferson", designation: null, email: "vic@gmail.com", role: "admin", schoolId: null});
    this.users.push({userId: "u2", name: "Gokul A", designation: null, email: "gok@gmail.com", role: "staff", schoolId: null});
    this.users.push({userId: "u3", name: "Aravind R", designation: null, email: "ara@gmail.com", role: "staff", schoolId: null});
    this.users.push({userId: "u4", name: "Karthick Raja", designation: null, email: "kar@gmail.com", role: "admin", schoolId: null});
    this.users.push({userId: "u5", name: "Sairam", designation: "staff", email: "us1@gmail.com", role: "staff", schoolId: "s1"});
    this.users.push({userId: "u6", name: "Rahul", designation: "staff", email: "us2@gmail.com", role: "staff", schoolId: "s1"});
  }

  initUsers(){
    return [...this.users];
  }

  emitUsers(){
    this.usersSubj.next([...this.users]);
  }

  addUser(name: string, email: string, role: string){
    let userId = this.generateUserId();
    this.users.push({userId: userId, name: name, email: email, role: role, designation: null, schoolId: null});
    this.emitUsers();
    return userId;
  }

  removeUser(userId: string){
    let userToDelete = this.users.find(e => e.userId === userId);
    let userToDeleteIndex = this.users.indexOf(userToDelete);
    this.users.splice(userToDeleteIndex,1);
    this.emitUsers();
  }

  assignSchoolToUser(userId: string, schoolId: string){
    let userToUpdate = this.users.find(e => e.userId === userId);
    let usertoUpdateIndex = this.users.indexOf(userToUpdate);
    this.users[usertoUpdateIndex].schoolId = schoolId;
    this.emitUsers();
  }

  assignDesignationToUser(userId: string, designation: string){
    let userToUpdate = this.users.find(e => e.userId === userId);
    let usertoUpdateIndex = this.users.indexOf(userToUpdate);
    this.users[usertoUpdateIndex].designation = designation;
    this.emitUsers();
  }

  generateUserId(){
    let lastUserIndex = this.users.length - 1;
    let lastUser = this.users[lastUserIndex];
    let lastUserId = lastUser.userId;
    let nextUserIdNum = Number(lastUserId.substr(1,1)) + 1;
    let userId = "u" + nextUserIdNum;
    return userId;
  }
}

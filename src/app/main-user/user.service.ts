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
    this.users.push({userId: "u1", name: "Victor Jefferson", email: "vic@gmail.com", role: "admin", schoolId: null});
    this.users.push({userId: "u2", name: "Gokul A", email: "gok@gmail.com", role: "staff", schoolId: null});
    this.users.push({userId: "u3", name: "Aravind R", email: "ara@gmail.com", role: "staff", schoolId: null});
    this.users.push({userId: "u4", name: "Karthick Raja", email: "kar@gmail.com", role: "admin", schoolId: null});
  }

  initUsers(){
    return [...this.users];
  }

  emitUsers(){
    this.usersSubj.next([...this.users]);
  }

  addUser(name: string, email: string, role: string){
    let userId = this.generateUserId();
    this.users.push({userId: userId, name: name, email: email, role: role, schoolId: null});
    this.emitUsers();
  }

  assignSchoolToUser(userId: string, schoolId: string){
    let userToUpdate = this.users.find(e => e.userId === userId);
    let usertoUpdateIndex = this.users.indexOf(userToUpdate);
    this.users[usertoUpdateIndex].schoolId = schoolId;
    this.emitUsers();
  }

  generateUserId(){
    let id = this.users.length + 1;
    let userId = "u" + id;
    return userId;
  }
}

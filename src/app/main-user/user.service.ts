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
    this.users.push({userId: "u1", name: "Victor Jefferson", initials: "VJ", email: "vic@gmail.com", role: "admin"});
    this.users.push({userId: "u2", name: "Gokul A", initials: "GA", email: "gok@gmail.com", role: "staff"});
    this.users.push({userId: "u3", name: "Karthick Raja", initials: "KR", email: "kar@gmail.com", role: "admin"});
  }

  initUsers(){
    return [...this.users];
  }

  emitUsers(){
    this.usersSubj.next([...this.users]);
  }

  addUser(name: string, email: string, role: string){
    let userId = this.generateUserId();
    let initials = this.initialize(name);
    this.users.push({userId: userId, name: name, initials: initials, email: email, role: role});
    this.emitUsers();
  }

  initialize(name: string){
    let initialsObj = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    let initials = initialsObj.join('');
    return initials;
  }

  generateUserId(){
    let id = this.users.length + 1;
    let userId = "u" + id;
    return userId;
  }
}

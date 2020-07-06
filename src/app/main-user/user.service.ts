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
    this.users.push({userId: "u1", name: "Victor Jefferson", email: "vic@gmail.com", role: "admin"});
    this.users.push({userId: "u2", name: "Gokul A", email: "gok@gmail.com", role: "staff"});
    this.users.push({userId: "u3", name: "Karthick Raja", email: "kar@gmail.com", role: "admin"});
  }

  initUsers(){
    return [...this.users];
  }

  emitUsers(){
    this.usersSubj.next([...this.users]);
  }

  addUser(name: string, email: string, role: string){
    let userId = this.generateUserId();
    this.users.push({userId: userId, name: name, email: email, role: role});
    this.emitUsers();
  }

  generateUserId(){
    let id = this.users.length + 1;
    let userId = "u" + id;
    return userId;
  }
}

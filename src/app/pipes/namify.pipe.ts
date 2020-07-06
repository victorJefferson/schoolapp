import { UserService } from './../main-user/user.service';
import { PipeTransform, Pipe } from '@angular/core';
import { User } from '../main-user/user.model';


@Pipe({
  name: 'namify'
})
export class NamifyPipe implements PipeTransform{
  users: User[] = [];
  user: User;

  constructor(private userService: UserService){}

  transform(Id: string){
    this.users = this.userService.initUsers();
    console.log(this.users);
    this.user = this.users.find(e => e.userId === Id);
    return this.user.name;
  }

}

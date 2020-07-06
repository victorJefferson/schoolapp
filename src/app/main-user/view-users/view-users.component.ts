import { UserService } from './../user.service';
import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users: User[];
  constructor(private usersService: UserService) { }

  ngOnInit(){
    this.usersService.usersSubj.subscribe(
      (users) => {
        this.users = users;
      }
    )
    this.users = this.usersService.initUsers();
  }

}

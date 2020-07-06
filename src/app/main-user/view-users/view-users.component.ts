import { Subscription } from 'rxjs';
import { UserService } from './../user.service';
import { User } from './../user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  users: User[];
  userSub: Subscription;

  constructor(private usersService: UserService) { }

  ngOnInit(){
    this.userSub = this.usersService.usersSubj.subscribe(
      (users) => {
        this.users = users;
      }
    )
    this.users = this.usersService.initUsers();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}

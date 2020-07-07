import { NgForm } from '@angular/forms';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(){
  }

  onAddUser(form: NgForm){
    if(form.invalid){
      return;
    }
    this.userService.addUser(form.value.username, form.value.email, form.value.role);
    form.reset();
  }

}

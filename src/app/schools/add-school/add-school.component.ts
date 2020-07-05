import { SchoolService } from './../school.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {
  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
  }

  onAddSchool(form: NgForm){
    if(form.invalid){
      return
    }
    this.schoolService.addSchool(form.value.schoolName, form.value.city);
  }
}

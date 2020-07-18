import { AppRoutingModule } from './app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ViewSchoolsComponent } from './schools/view-schools/view-schools.component';
import { AddSchoolComponent } from './schools/add-school/add-school.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './main-user/add-user/add-user.component';
import { UserComponent } from './main-user/user/user.component';
import { ViewUsersComponent } from './main-user/view-users/view-users.component';
import { NamifyPipe } from './pipes/namify.pipe';
import { InitializePipe } from './pipes/initialize.pipe';
import { ViewSchoolComponent } from './schools/view-school/view-school.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { StaffManagementComponent } from './schools/staff-management/staff-management.component';
import { SchoolSidenavComponent } from './schools/school-sidenav/school-sidenav.component';
import { ManageSubjectsComponent } from './schools/manage-subjects/manage-subjects.component';
import { ManageClassesComponent } from './schools/manage-classes/manage-classes.component';
import { ManageStaffsComponent } from './schools/manage-staffs/manage-staffs.component';
import { StudentManagementComponent } from './schools/student-management/student-management.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewSchoolsComponent,
    AddSchoolComponent,
    AddUserComponent,
    UserComponent,
    ViewUsersComponent,
    InitializePipe,
    NamifyPipe,
    ViewSchoolComponent,
    SidenavComponent,
    StaffManagementComponent,
    SchoolSidenavComponent,
    ManageSubjectsComponent,
    ManageClassesComponent,
    ManageStaffsComponent,
    StudentManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatTooltipModule,
    AvatarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

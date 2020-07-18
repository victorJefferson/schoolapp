import { StudentManagementComponent } from './schools/student-management/student-management.component';
import { StaffManagementComponent } from './schools/staff-management/staff-management.component';
import { ViewSchoolComponent } from './schools/view-school/view-school.component';
import { UserComponent } from './main-user/user/user.component';
import { AddSchoolComponent } from './schools/add-school/add-school.component';
import { ViewSchoolsComponent } from './schools/view-schools/view-schools.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ViewSchoolsComponent },
  { path: 'addSchool', component: AddSchoolComponent },
  { path: 'user', component: UserComponent },
  { path: 'viewSchool/:schoolId', component: ViewSchoolComponent },
  { path: 'viewSchool/staffManagement/:schoolId', component: StaffManagementComponent },
  { path: 'viewSchool/studentManagement/:schoolId', component: StudentManagementComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

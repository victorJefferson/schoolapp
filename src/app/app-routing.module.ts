import { AddSchoolComponent } from './schools/add-school/add-school.component';
import { ViewSchoolsComponent } from './schools/view-schools/view-schools.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ViewSchoolsComponent },
  { path: 'addSchool', component: AddSchoolComponent }

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

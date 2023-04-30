import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageCentersComponent } from './manage-centers/manage-centers.component';
import { ManageSubjectsComponent } from './manage-subjects/manage-subjects.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: '', component:DashboardComponent, children: [
    {path: '', component:ManageUsersComponent},
    {path: 'manage-users', component:ManageUsersComponent},
    {path: 'manage-centers', component:ManageCentersComponent},
    {path: 'manage-subjects', component:ManageSubjectsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

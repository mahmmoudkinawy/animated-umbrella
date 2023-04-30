import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageCentersComponent } from './manage-centers/manage-centers.component';
import { ManageSubjectsComponent } from './manage-subjects/manage-subjects.component';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoadersComponent } from 'src/app/components/loaders/loaders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageUsersComponent,
    ManageCentersComponent,
    ManageSubjectsComponent,

    LoadersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }

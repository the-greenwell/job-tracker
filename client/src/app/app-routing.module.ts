import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobsDetailsComponent } from './jobs-details/jobs-details.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';

const routes: Routes = [
  {
    path: 'jobs',
    component: JobsComponent,
    data: { title: 'List of Jobs' }
  },
  {
    path: 'jobs-details/:id',
    component: JobsDetailsComponent,
    data: { title: 'Edit Job Details' }
  },
  {
    path: 'add-jobs',
    component: AddJobsComponent,
    data: { title: 'Add Job' }
  },
  { path: '',
    redirectTo: 'jobs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

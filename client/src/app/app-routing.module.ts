import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobsDetailsComponent } from './jobs-details/jobs-details.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';

const routes: Routes = [
  {
    path: 'jobs',
    component: JobsComponent,
    data: { title: 'List of Jobs' }
  },
  {
    path: 'jobs-details/:id',
    component: JobsDetailsComponent,
    data: { title: 'Jobs Details' }
  },
  {
    path: 'add-jobs',
    component: AddJobsComponent,
    data: { title: 'Add Jobs' }
  },
  {
    path: 'edit-jobs/:id',
    component: EditJobsComponent,
    data: { title: 'Edit Jobs' }
  },
  { path: '',
    redirectTo: 'add-jobs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

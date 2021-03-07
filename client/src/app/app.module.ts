import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsDetailsComponent } from './jobs-details/jobs-details.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobsDetailsComponent,
    AddJobsComponent,
    EditJobsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

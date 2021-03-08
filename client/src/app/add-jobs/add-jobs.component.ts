import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {

  jobForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.jobForm = this.formBuilder.group({
      company: [''],
      position: [''],
      status: [''],
      link: [''],
      notes: [''],
      starred: [false],
    })
  }

  ngOnInit(): void { }

  onSubmit(): any {
    this.apiService.AddJob(this.jobForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/jobs'))
      }, (err) => {
        console.log(err);
    })
  }

}

import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.css']
})

export class JobsDetailsComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.GetJob(this.getId).subscribe(res => {
      this.updateForm.setValue({
        company: res['company'],
        position: res['position'],
        status: res['status'],
        link: res['link'],
        notes: res['notes'],
        starred: res['starred'],
      });
    });

    this.updateForm = this.formBuilder.group({
      company: [''],
      position: [''],
      status: [''],
      link: [''],
      notes: [''],
      starred: [''],
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    console.log(this.getId, this.updateForm.value)
    this.apiService.updateJob(this.getId, this.updateForm.value)
    .subscribe(() => {
      console.log('Data updated succesfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/jobs'))
    }, (err) => {
      console.log(err);
    })
  }

}
